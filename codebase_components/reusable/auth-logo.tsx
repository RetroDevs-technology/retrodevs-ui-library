import { getRoutePath } from "@/config/get-route-path"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface AuthLogoProps {
  className?: string
}

export function AuthLogo({ className }: AuthLogoProps) {
  return (
    <Link
      to={getRoutePath("home")}
      className={cn(
        "inline-block transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm",
        className,
      )}>
      <img
        src="/assets/lp/logo.png"
        alt="Formatic Trucking"
        width={181}
        height={44}
        className="max-md:w-[131px] max-md:h-8"
      />
    </Link>
  )
}


