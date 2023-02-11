import { useState, useEffect } from "react";
import { retrieveItem } from "./storage";

const useCheckLogin = () => {
  const [is_logged_in, setIsLoggedIn] = useState(null);
  useEffect(() => {
    let token = retrieveItem("token");
    try {
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      setIsLoggedIn(false);
    }
  });
  return is_logged_in;
};

const usePageAccess = (key) => {
  const [hasAccess, setHasAccess] = useState(null);
  useEffect(() => {
    let user = null;
    let userValue = localStorage.getItem("user");
    try {
      user = JSON.parse(userValue);
      let pageAccess = user.PageAccess.find((x) => x.Name === key);
      if (pageAccess) {
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }
    } catch (e) {
      setHasAccess(false);
    }
  });
  return hasAccess;
};

const usePageComponentAccess = (key) => {
  const [hasAccess, setHasAccess] = useState(null);
  useEffect(() => {
    let user = null;
    let userValue = localStorage.getItem("user");
    try {
      user = JSON.parse(userValue);
      let pageComponentAccess = user.PageComponentAccess.find(
        (x) => x.Name === key
      );
      if (pageComponentAccess) {
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }
    } catch (e) {
      setHasAccess(false);
    }
  });
  return hasAccess;
};

export {
  useCheckLogin as useCheckLogin,
  usePageAccess as usePageAccess,
  usePageComponentAccess as usePageComponentAccess,
};
