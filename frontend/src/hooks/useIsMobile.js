import { useState, useEffect } from "react";
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkISMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    checkISMobile();
    window.addEventListener("resize", checkISMobile);
    return () => {
      window.removeEventListener("resize", checkISMobile);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
