import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useIsClient } from "@/components/Responsive/useIsClient";

export const useIsResponsive = (): boolean[] => {
  const isClient = useIsClient();
  const isDeskTop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const isMobile = true;
  const [isClientDeskTop, setIsClientDeskTop] = useState(false);
  const [isClientTablet, setIsClientTablet] = useState(false);
  const [isClientMobile, setIsClientMobile] = useState(false);
  useEffect(() => {
    setIsClientDeskTop(isClient && isDeskTop);
    setIsClientTablet(isClient && !isDeskTop && isTablet);
    setIsClientMobile(isClient && !isDeskTop && !isTablet && isMobile);
  }, [isClient, isDeskTop, isTablet, isMobile]);
  return [isClientDeskTop, isClientTablet, isClientMobile];
};
