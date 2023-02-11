import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import { retrieveItem, useStorageItem } from "@helpers/storage";
//import { logoutRequest } from "../../redux";

const BASE_URL = "http://192.168.1.68:5010/dev/graphql";

// process.env.REACT_APP_BASE_URL;

const httpLink = createHttpLink({
  uri: BASE_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const user = retrieveItem("token");
  const user_token = retrieveItem("user_token");

  return {
    headers: {
      ...headers,
      // token:
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InN5c3RlbV91c2VyX2lkIjoiYTBhZjc1NWUtZDQ5My00YjRjLWFmOTYtNDNmYjIxODVlNjU3IiwidXNlcl9pZCI6IjE2Njk2Njc2LTE0ODYtNzYwYy1hNDA5LTIxZDFhYzRmZjc3MCIsIm5hbWUiOiJBaml0aCIsImRvYiI6IjE5OTktMDQtMTJUMTg6MzA6MDAuMDAwWiIsImdlbmRlciI6Im0iLCJ1c2VyX3ByZWZlcmVuY2VzIjp7Im1hcml0YWxfc3RhdHVzZXMiOltdLCJib2R5X3R5cGVzIjpbXX0sImlfbWVtcyI6W10sImJfbWVtcyI6W10sImJfbWUiOltdLCJzZXNzaW9uX2lkIjoiYTkyNzA4OWYtMzZlYi00ODY2LWFiNDEtMzQ0ODM0OTYyMWZlIiwicm9sZXMiOlt7ImlkIjoiMDRjMDVjODItOTJhMS00ZDBiLWIzMGEtMjQxZGQwNGIxNzBiIiwibmFtZSI6IlVzZXIiLCJob21lX3VpX21vZHVsZV9pZCI6bnVsbCwiaXNfZGVsZXRlZCI6ZmFsc2V9XX0sImlhdCI6MTY2OTY0ODAyOSwiZXhwIjoxNjcwOTYyMDI5fQ.k61cWbkS5-9yYRyYooKGuNU4D95VXlJGeNEJ6qxdwEQ",

      token: user ? user : "",
      user_token: user_token ? user_token : "",
      // user_token:
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InN5c3RlbV91c2VyX2lkIjoiNzY4MTU1MGEtNjU4Yy00MjIxLTk3YmItOTdlYjJlMTViZTVhIiwidXNlcl9pZCI6Ijc2ODE1NTBhLTY1OGMtNDIyMS05N2JiLTk3ZWIyZTE1YmU1YSIsIm5hbWUiOiJIYXJpIiwiZG9iIjoiMTk5Ny0wNS0xNVQwMDowMDowMC4wMDBaIiwiZ2VuZGVyIjoibSIsInVzZXJfcHJlZmVyZW5jZXMiOnsiYWdlX2Zyb20iOjE4LCJhZ2VfdG8iOjUwLCJjb21wbGV4aW9ucyI6W10sIm1hcml0YWxfc3RhdHVzZXMiOltdLCJib2R5X3R5cGVzIjpbXSwicGh5c2ljYWxfc3RhdHVzZXMiOltdLCJtb3RoZXJfdG9uZ3VlcyI6W10sImVhdGluZ19oYWJpdHMiOltdLCJkcmlua2luZ19oYWJpdHMiOltdLCJzbW9raW5nX2hhYml0cyI6W10sInJlbGlnaW9ucyI6W10sImNhc3RlcyI6W10sInN1Yl9jYXN0ZXMiOltdLCJzdGFycyI6W10sInJhYXNpcyI6W10sImRvc2hhbXMiOltdLCJjb3VudHJpZXMiOltdLCJzdGF0ZXMiOltdLCJjaXRpZXMiOltdLCJlZHVjYXRpb25zIjpbXSwiZW1wbG95bWVudF90eXBlcyI6W119LCJpX21lbXMiOltdLCJiX21lbXMiOltdLCJiX21lIjpbIjg0M2U1NDM5LTNhMWUtNDA2MC05MWU5LWZiMWI3YTYzMGM0NiJdLCJzZXNzaW9uX2lkIjoiYTI4YTA2NjItODk2Mi00NWQ1LTg2ZWUtMDM2OTc4YzY3OWM3Iiwicm9sZXMiOlt7ImlkIjoiMDRjMDVjODItOTJhMS00ZDBiLWIzMGEtMjQxZGQwNGIxNzBiIiwibmFtZSI6IlVzZXIiLCJob21lX3VpX21vZHVsZV9pZCI6bnVsbCwiaXNfZGVsZXRlZCI6ZmFsc2V9XX0sImlhdCI6MTY3Mjk4ODQwMiwiZXhwIjoxNzA0NTI0NDAyfQ.G1qngurymYj4f-M8JPg0UhwYQVJQfTG8cbEh7J56GY0",
    },
  };
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: defaultOptions,
});

export async function QueryRequest(query, variables, dispatch) {
  try {
    let response = await client.query({
      query,
      variables,
    });
    let isUnauthorized =
      JSON.stringify(response).indexOf("Not authorized") > -1;
    if (isUnauthorized && dispatch) {
      //  dispatch(logoutRequest("invalid"));
      return "Not authorized";
    }
    return response;
  } catch (e) {
    if (dispatch) {
      //  dispatch(logoutRequest("invalid"));
    }
    return { req_error: e };
  }
}
export async function MutateRequest(mutation, variables, dispatch) {
  let response = null;
  try {
    response = await client.mutate({
      mutation,
      variables,
    });
    let isUnauthorized =
      JSON.stringify(response).indexOf("Not authorized") > -1;
    if (isUnauthorized && dispatch) {
      //  dispatch(logoutRequest("invalid"));
      return "Not authorized";
    }
    return response;
  } catch (e) {
    if (dispatch) {
      //  dispatch(logoutRequest("invalid"));
    }
    return { req_error: e };
  }
}
