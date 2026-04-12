import { Button } from "@/components/ui"
import { cn } from "@/lib/utils"
import { MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface FloatingMessageButtonProps {
  onClick: () => void
  unreadCount?: number
  className?: string
}

export function FloatingMessageButton({
  onClick,
  unreadCount = 0,
  className,
}: FloatingMessageButtonProps) {
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
        "fixed bottom-6 right-6 z-50 transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        className,
      )}>
      <Button
        onClick={onClick}
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 relative">
        <MessageCircle className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center min-w-[24px] border-2 border-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>
    </div>
  )
}

