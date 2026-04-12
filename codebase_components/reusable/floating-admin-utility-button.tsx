import { Button } from "@/components/ui"
import { cn } from "@/lib/utils"
import { Wrench } from "lucide-react"
import { useEffect, useState } from "react"

interface FloatingAdminUtilityButtonProps {
  onClick: () => void
  className?: string
}

export function FloatingAdminUtilityButton({
  onClick,
  className,
}: FloatingAdminUtilityButtonProps) {
  const [isVisible, setIsVisible] = useState(true)

  // Hide button when scrolling down, show when scrolling up or at top
  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          // Show button if at top or scrolling up
          setIsVisible(currentScrollY < 100 || currentScrollY < lastScrollY)
          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-6 right-4 sm:right-24 z-50 transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        className,
      )}>
      <Button
        onClick={onClick}
        size="lg"
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 bg-primary">
        <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>
    </div>
  )
}

