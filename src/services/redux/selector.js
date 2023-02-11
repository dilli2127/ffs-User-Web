import { useSelector as _useSelector } from "react-redux";
import { dynamicEntitySelector } from "./slices";

export function useDynamicSelector(key) {
  const _data = _useSelector((state) => dynamicEntitySelector(state, key));
  return _data || {};
}
