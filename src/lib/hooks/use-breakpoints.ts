import * as React from "react"

export { useIsMobile } from "./use-mobile"

/**
 * Subscribes to a CSS media query string (e.g. `(min-width: 1024px)`).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    function onChange() {
      setMatches(media.matches)
    }
    onChange()
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [query])

  return matches
}
