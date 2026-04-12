import {
  AccordionMenu,
  AccordionMenuGroup,
  AccordionMenuItem,
  AccordionMenuSub,
  AccordionMenuSubContent,
  AccordionMenuSubTrigger,
} from "@/components/ui/accordion-menu"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import BaseTooltip from "./base-tooltip"

interface SidebarRoute {
  label: string
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>
  subLinks: { label: string; href: string }[]
  open: boolean
  toggleSidebar: () => void
}

export default function BaseAccordionMenu({
  label,
  icon,
  subLinks,
  open,
  toggleSidebar,
}: SidebarRoute) {
  const location = useLocation().pathname
  const navigate = useNavigate()

  const isActive = subLinks.some((item) => item.href === location)
  const Icon = icon

  function handleClick() {
    if (!open) {
      toggleSidebar()
    }
  }

  return (
    <div className="w-full">
      <BaseTooltip content={label} className="w-full">
        <AccordionMenu type="single" collapsible>
          <AccordionMenuGroup>
            <AccordionMenuSub value="shipmentManagement">
              <AccordionMenuSubTrigger
                onClick={handleClick}
                className={cn(
                  "flex self-center items-center gap-1 text-sm rounded-[6px] transition-all duration-300 ease-in-out font-medium [&>svg]:hidden",
                  {
                    "px-4": open,
                    "px-2 w-fit mx-auto": !open,
                  },
                  isActive
                    ? "bg-white text-primary shadow hover:text-primary-300 hover:bg-primary-100"
                    : "text-accent hover:text-primary-300 hover:bg-primary-100",
                )}>
                <div>
                  <Icon className="shrink-0" size={20} />
                </div>
                {open && <span className="truncate">{label}</span>}
              </AccordionMenuSubTrigger>
              <AccordionMenuSubContent type="single" collapsible parentValue="shipmentManagemnent">
                <AccordionMenuGroup>
                  {subLinks.map((item) => {
                    const isChildActive = item.href === location

                    return (
                      <AccordionMenuItem
                        key={item.label}
                        value={item.label}
                        onClick={() => navigate(item.href)}
                        className={cn(
                          "flex items-center gap-1 text-sm rounded-[12px] transition-all duration-300 ease-in-out font-medium bg-transparent hover:bg-transparent",
                          isChildActive
                            ? "text-primary hover:text-primary-300"
                            : "text-accent hover:text-primary-300",
                        )}>
                        <span className="truncate">{item.label}</span>
                      </AccordionMenuItem>
                    )
                  })}
                </AccordionMenuGroup>
              </AccordionMenuSubContent>
            </AccordionMenuSub>
          </AccordionMenuGroup>
        </AccordionMenu>
      </BaseTooltip>
    </div>
  )
}
