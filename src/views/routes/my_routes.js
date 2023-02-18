
import Layout1 from "@views/layouts/user_layout1";
import UserHome from "@views/pages/user_home";

export const ROUTES = {
 
  USER_HOME: "/",
 
};

const myRoutes = [
  {
    key: "Home",
    authenticate: false,
    component: Layout1,
    children:[
      {
        path: ROUTES.USER_HOME,
        exact: true,
        key: "user_home",
        authenticate: false,
        component: UserHome,
      }
    ]
      },
 
];

export default myRoutes;
