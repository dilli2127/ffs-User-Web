import { useRef, useEffect } from "react";

export function useEventListener(eventName, functionToCall, element) {
  const savedFunction = useRef();

  useEffect(() => {
    savedFunction.current = functionToCall;
  }, [functionToCall]);

  useEffect(() => {
    if (!element) return;
    const eventListener = (event) => savedFunction.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
