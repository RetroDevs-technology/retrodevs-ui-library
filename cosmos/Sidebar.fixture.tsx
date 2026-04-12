import React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../src/components/core/sidebar"
import { FixtureWrapper } from "./FixtureWrapper"

export default function SidebarShowcase() {
  return (
    <FixtureWrapper title="Sidebar">
      <div className="rounded-lg border overflow-hidden min-h-[420px]">
        <SidebarProvider className="min-h-[420px]">
          <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border">
              <p className="text-sm font-semibold px-2">Acme Inc</p>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Dashboard">Dashboard</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Inbox">Inbox</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">Settings</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-14 items-center gap-2 border-b px-4">
              <SidebarTrigger />
              <span className="text-sm font-medium">Main content</span>
            </header>
            <main className="p-4 text-sm text-muted-foreground">
              Resize the viewport or use the trigger to toggle the sidebar. On small screens the sidebar
              opens in a sheet.
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </FixtureWrapper>
  )
}
