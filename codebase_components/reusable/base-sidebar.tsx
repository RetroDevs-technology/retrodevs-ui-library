// src/components/reusable/collapsible-sidebar.tsx
"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Icons from "@/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"
import { getRoutePath } from "@/config/get-route-path"
import { cn } from "@/lib/utils"
import { useStore } from "@/store"
import { ChevronDown, ChevronRight, HelpCircle, LogOut, Menu } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import React from "react"
import { Link, useLocation } from "react-router-dom"
import BaseAccordionMenu from "./base-accordion-menu"
import BaseTooltip from "./base-tooltip"

const { HelpSupport: HelpSupportIcon, Logout: LogoutIcon } = Icons

export interface SidebarRoute {
  label: string
  href: string
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>
  onClick?: () => void
  subLinks?: { label: string; href: string }[]
  fill?: boolean
}

export interface SidebarGroupRoute {
  label: string
  icon: LucideIcon | React.ComponentType<any>
  routes: SidebarRoute[]
  defaultOpen?: boolean
}

export interface CollapsibleSidebarProps {
  routes: (SidebarRoute | SidebarGroupRoute)[]
  logo: ReactNode
  collapsedLogo?: ReactNode
  children: ReactNode
}

export default function CollapsibleSidebar({
  routes,
  logo,
  collapsedLogo,
  children,
}: CollapsibleSidebarProps) {
  return (
    <SidebarProvider>
      <SidebarBody routes={routes} logo={logo} collapsedLogo={collapsedLogo} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}

const SidebarBody = React.memo(
  ({
    routes,
    logo,
    collapsedLogo,
  }: {
    routes: (SidebarRoute | SidebarGroupRoute)[]
    logo: ReactNode
    collapsedLogo?: ReactNode
  }) => {
    const { open, toggleSidebar, isMobile } = useSidebar()
    const location = useLocation().pathname
    const { logout } = useStore()

    const footerRoutes: SidebarRoute[] = [
      {
        label: "Help and Support",
        href: getRoutePath("help"),
        icon: HelpSupportIcon,
      },
      {
        label: "Logout",
        href: "#",
        icon: LogoutIcon,
        onClick: logout,
      },
    ]

    // Memoize the isRouteActive function
    const isRouteActive = React.useCallback(
      (href: string): boolean => {
        if (href === "/dashboard") {
          return location === href
        }
        return location === href || location.startsWith(`${href}/`)
      },
      [location],
    )

    const renderSidebarItem = React.useCallback(
      (route: SidebarRoute, isActive: boolean) => {
        if (route.subLinks && route.subLinks.length > 0) {
          return (
            <BaseAccordionMenu
              label={route.label}
              open={open}
              icon={route.icon}
              subLinks={route.subLinks}
              toggleSidebar={toggleSidebar}
            />
          )
        }

        if (route.onClick) {
          // If route has a custom onClick handler, use a button instead of Link
          return (
            <button
              type="button"
              onClick={route.onClick}
              className={cn(
                "flex items-center gap-1 text-sm rounded-[12px] transition-all duration-300 ease-in-out font-medium w-full text-left",
                isActive
                  ? "bg-white text-primary shadow hover:text-primary-300 hover:bg-primary-100"
                  : "text-accent hover:text-primary-300 hover:bg-primary-100",
                open ? "px-4 py-3" : "p-2",
              )}>
              <route.icon className="shrink-0" size={20} />
              <span className="truncate">{route.label}</span>
            </button>
          )
        }

        // Default Link behavior for regular routes
        return (
          <Link
            to={route.href}
            onClick={(e) => {
              if (location === route.href) {
                e.preventDefault()
                return
              }
            }}
            className={cn(
              "flex items-center gap-1 text-sm rounded-[12px] transition-all duration-300 ease-in-out font-medium hover:fill-primary-300",
              isActive
                ? "bg-white text-primary stroke-primary hover:stroke-primary-300 fill-primary shadow hover:text-primary-300 hover:bg-primary-100"
                : "text-accent fill-accent stroke-accent hover:stroke-primary-300 hover:text-primary-300 hover:bg-primary-100",
              open ? "px-4 py-3" : "p-2",
            )}>
            <route.icon
              className={cn("shrink-0", {
                "fill-inherit stroke-none": route.fill,
                "stroke-inherit fill-none": !route.fill,
              })}
              size={20}
            />
            <span className="truncate">{route.label}</span>
          </Link>
        )
      },
      [location, open],
    )

    const renderSidebarGroup = React.useCallback(
      (group: SidebarGroupRoute) => {
        // On mobile, always show the expanded version with sub-items
        // When collapsed on desktop, just show the group icon as a standalone item
        if (!open && !isMobile) {
          return (
            <SidebarMenuItem key={`group-${group.label}`} className="w-full flex justify-center">
              <SidebarMenuButton tooltip={group.label}>
                <div className="flex items-center justify-center p-2">
                  <group.icon className="shrink-0" size={20} />
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        }

        // When expanded, show the full collapsible group
        return (
          <Collapsible defaultOpen={group.defaultOpen} className="group/collapsible">
            <SidebarGroup className="p-0">
              <SidebarGroupLabel asChild className="p-0">
                <SidebarMenuItem className="w-full">
                  <SidebarMenuButton asChild>
                    <CollapsibleTrigger
                      className={cn(
                        "flex items-center gap-1 text-sm rounded-[12px] transition-all duration-300 ease-in-out font-medium w-full text-left",
                        "text-accent hover:text-primary-300 hover:bg-primary-100",
                        "px-4 py-3",
                      )}>
                      <group.icon className="shrink-0" size={20} />
                      <span className="truncate">{group.label}</span>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent
                  className={cn(
                    "relative",
                    group.label === "Shipment Management" || group.label === "Public Management" ? "ml-4" : "ml-4 mt-2 space-y-1",
                  )}>
                  {(group.label === "Shipment Management" || group.label === "Public Management") && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300" />
                  )}
                  {group.routes.map((route, index) => {
                    const isActive = isRouteActive(route.href)
                    const isLast = index === group.routes.length - 1
                    const isTreeStyle = group.label === "Shipment Management" || group.label === "Public Management"

                    if (isTreeStyle) {
                      return (
                        <div key={route.href} className="relative" style={{ minHeight: "36px" }}>
                          {/* Horizontal connector line from vertical line to item */}
                          <div className="absolute left-0 top-[50%] w-4 h-0.5 bg-gray-300 -translate-y-[50%]" />

                          {/* Optional vertical line continuation for non-last items */}
                          {!isLast && (
                            <div className="absolute left-0 top-[50%] bottom-0 w-0.5 bg-gray-300 -translate-y-[50%]" />
                          )}

                          <SidebarMenuItem data-active={isActive} className="w-full">
                            <Link
                              to={route.href}
                              onClick={(e) => {
                                if (location === route.href) {
                                  e.preventDefault()
                                  return
                                }
                              }}
                              className={cn(
                                "flex items-center gap-2 text-sm transition-all duration-300 ease-in-out font-medium px-2 py-2",
                                isActive
                                  ? "text-blue-600 font-semibold"
                                  : "text-gray-600 hover:text-blue-600",
                              )}>
                              <ChevronRight
                                size={16}
                                className={cn(
                                  "shrink-0 transition-colors",
                                  isActive ? "text-blue-600" : "text-gray-400",
                                )}
                              />
                              <span className="truncate">{route.label}</span>
                            </Link>
                          </SidebarMenuItem>
                        </div>
                      )
                    }

                    // Default rendering for non-tree style groups
                    return (
                      <SidebarMenuItem
                        key={route.href}
                        data-active={isActive}
                        className="w-full flex justify-center">
                        <SidebarMenuButton asChild tooltip={route.label}>
                          {renderSidebarItem(route, isActive)}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )
      },
      [open, isMobile, renderSidebarItem, isRouteActive, location],
    )

    // Memoize the routes rendering
    const renderedRoutes = React.useMemo(() => {
      return routes.map((route, index) => {
        // Check if it's a group route
        if ("routes" in route) {
          return (
            <React.Fragment key={`group-${route.label}`}>
              {renderSidebarGroup(route)}
            </React.Fragment>
          )
        }

        // Regular route
        const isActive = isRouteActive(route.href)
        return (
          <SidebarMenuItem
            key={route.href}
            data-active={isActive}
            className={cn(!open && "w-full flex justify-center")}>
            <SidebarMenuButton asChild tooltip={!open ? route.label : undefined}>
              {renderSidebarItem(route, isActive)}
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })
    }, [routes, isRouteActive, open, renderSidebarItem, renderSidebarGroup])

    return (
      <Sidebar
        collapsible="icon"
        className="border-r h-screen bg-background w-[240px] transition-all duration-300 ease-in-out sticky top-0">
        <SidebarHeader>
          <div
            className={cn(
              "flex items-center justify-between py-4 bg-white rounded-lg border border-border transition-all duration-300 ease-in-out shadow-custom-header",
              open ? "px-4" : "px-2",
            )}>
            <span className="flex items-center justify-start w-full transition-all duration-300 ease-in-out">
              {open ? logo : collapsedLogo}
            </span>
            <BaseTooltip content={open ? "Collapse sidebar" : "Expand sidebar"}>
              <button
                aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
                onClick={toggleSidebar}
                className="rounded-[12px] p-1 bg-accent hover:bg-accent/95 transition-all duration-300 ease-in-out absolute -right-3 top-[80px] shadow"
                style={{ zIndex: 10 }}
                type="button">
                <Menu
                  size={20}
                  className={cn(
                    "text-white transition-transform duration-300",
                    open ? "rotate-180" : "",
                  )}
                />
              </button>
            </BaseTooltip>
          </div>
        </SidebarHeader>
        <SidebarContent className="mt-0">
          <SidebarMenu
            className={cn(open ? "px-8" : "px-1", "transition-all duration-300 ease-in-out")}>
            {renderedRoutes}
          </SidebarMenu>
        </SidebarContent>

        {footerRoutes && (
          <SidebarFooter className="mt-auto flex flex-col p-0 pb-4">
            <SidebarMenu
              className={cn(open ? "px-8" : "px-1", "transition-all duration-300 ease-in-out")}>
              {footerRoutes.map((route) => {
                const isActive = isRouteActive(route.href)
                return (
                  <SidebarMenuItem
                    key={route.href}
                    data-active={isActive}
                    className={cn(!open && "w-full flex justify-center")}>
                    <SidebarMenuButton asChild tooltip={!open ? route.label : undefined}>
                      {renderSidebarItem(route, isActive)}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarFooter>
        )}
      </Sidebar>
    )
  },
)

SidebarBody.displayName = "SidebarBody"
