
import UserHome from "@views/pages/user_home";

export const ROUTES = {
 
  USER_HOME: "/",
 
};

const myRoutes = [
 
  {
    path: ROUTES.USER_HOME,
    exact: true,
    key: "user_home",
    authenticate: false,
    component: UserHome,
      },
 
];

export default myRoutes;
