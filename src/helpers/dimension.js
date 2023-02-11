import { useRef, useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowSize() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export function useParentSize(ref) {
  const [parentSize, setParentSize] = useState({
    parentWidth: undefined,
    parentHeight: undefined,
  });
  useEffect(() => {
    if (ref?.current?.parentNode) {
      setParentSize({
        parentWidth: ref.current.parentNode.clientWidth,
        parentHeight: ref.current.parentNode.clientHeight,
      });
    }
    return () => true;
  }, []);
  return parentSize;
}

export function useComponentSize(ref) {
  const initialState = { width: 0, height: 0 };
  const [dimensions, setdDimensions] = useState(initialState);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries = []) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        setdDimensions({ width, height });
      });
    });
    if (ref.current) resizeObserverRef.current.observe(ref.current);
    return () => {
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    };
  }, [ref]);
  return dimensions;
}
