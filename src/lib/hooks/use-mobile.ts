import * as React from "react"

const MOBILE_BREAKPOINT_PX = 768

/**
 * Returns true when the viewport width is below the mobile breakpoint.
 * SSR-safe: returns false until mounted, then updates from matchMedia.
 */
export function useIsMobile(breakpointPx: number = MOBILE_BREAKPOINT_PX): boolean {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const query = `(max-width: ${breakpointPx - 1}px)`
    const media = window.matchMedia(query)
    function onChange() {
      setIsMobile(media.matches)
    }
    onChange()
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [breakpointPx])

  return isMobile
}
