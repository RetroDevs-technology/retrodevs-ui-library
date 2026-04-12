import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function toggleVisibility() {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={scrollToTop}
          size="icon"
          variant="default"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 size-12 opacity-60 hover:opacity-100"
          aria-label="Scroll to top">
          <ArrowUp className="size-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="bg-white text-primary">
        <p>Scroll to top</p>
      </TooltipContent>
    </Tooltip>
  )
}

