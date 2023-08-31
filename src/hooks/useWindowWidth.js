import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 500;
const SMALL_DESKTOP_BREAKPOINT = 1300;

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= MOBILE_BREAKPOINT;
  const isSmallDesktop = width <= SMALL_DESKTOP_BREAKPOINT;
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return {
    width,
    isMobile,
    isSmallDesktop
  }
}
export default useWindowWidth;