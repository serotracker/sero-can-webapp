import { useMediaQuery } from "react-responsive";

export const isMobileDevice = useMediaQuery({ maxDeviceWidth: 600 })
export const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: 1200 })