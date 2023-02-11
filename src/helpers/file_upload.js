import { gql } from "@apollo/client";
import { QueryRequest } from "@services/apollo/api_service";
import { fileQuery } from "@services/redux";
import axios from "axios";

export default async function fileUpload(file, storageName) {
  let url = await getURL(storageName, file?.name);

  let final_url = url?.split("?")[0];
  let success = true;
  await axios
    .put(url, file, {
      headers: { "Content-Type": file?.type },
    })
    .then(async (res) => {
      if (res.status.toString() === "200") {
        // return final_url;
      } else {
        success = false;
      }
    });
  if (success) {
    return final_url;
  }
}
async function getURL(type, fileName) {
  let { data } = await QueryRequest(fileQuery, { type, fileName });
  return data.getUploadUrl.url;
}
