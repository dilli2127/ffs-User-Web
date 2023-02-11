import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import {
  Box,
  NativeBaseProvider,
  extendTheme,
  theme as nbTheme,
} from "native-base";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconContext } from "react-icons";
import { store } from "@services/redux/store";
import App from "./App";
import "./i18n";
import { Toaster } from "react-hot-toast";

const theme = extendTheme({
  colors: {
    primary: nbTheme.colors.violet,
    primaryContent: nbTheme.colors.warmGray,
    inputBorder: nbTheme.colors.coolGray,
    error: nbTheme.colors.red,
  },
  breakpoints: {
    base: 0,
    xs: 320,
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1440,
    "2xl": 2560,
    "3xl": 3840,
  },
  // components:{
  //   Box:()=>{

  //   }
  // }
});
ReactDOM.render(
  <Provider store={store}>
    <NativeBaseProvider theme={theme}>
      <IconContext.Provider value={{ className: "global-class-name" }}>
        <App />
        <ToastContainer newestOnTop pauseOnFocusLoss />
        <Toaster position="top-center" reverseOrder={false} />
      </IconContext.Provider>
    </NativeBaseProvider>
  </Provider>,
  document.getElementById("root")
);
