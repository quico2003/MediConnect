import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Configuration } from "../Config/app.config";
import { setMobileViewAction } from "../Redux/actions/ConfigActions";

function useWindowSize() {
  const dispatch = useDispatch();

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    function updateSize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      dispatch(
        setMobileViewAction(window.innerWidth < Configuration.BREAKPOINT)
      );
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [dispatch]);

  return {
    width: size.width,
    height: size.height,
  };
}

export default useWindowSize;
