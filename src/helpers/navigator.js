import { historyRef } from "@views/routes/Router";

export const navigate = (path) => {
  historyRef.current.push(path);
};

export const navigateWithProps = (path, props) => {
  historyRef.current.push({
    pathname: path,
    props_state: props,
  });
};

export const navigateBack = () => {
  historyRef.current.goBack();
};
