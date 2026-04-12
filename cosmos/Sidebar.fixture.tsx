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
import { useFixtureInput } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function SidebarShowcase() {
  const [brand] = useFixtureInput("sidebarBrandName", "Acme Inc")
  const [groupLabel] = useFixtureInput("sidebarGroupLabel", "Application")
  const [nav1] = useFixtureInput("sidebarNavDashboard", "Dashboard")
  const [nav2] = useFixtureInput("sidebarNavInbox", "Inbox")
  const [nav3] = useFixtureInput("sidebarNavSettings", "Settings")
  const [mainTitle] = useFixtureInput("sidebarInsetTitle", "Main content")
  const [mainHint] = useFixtureInput(
    "sidebarInsetHint",
    "Resize the viewport or use the trigger to toggle the sidebar. On small screens the sidebar opens in a sheet.",
  )

  return (
    <FixtureWrapper title="Sidebar">
      <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
        Brand, group label, nav item labels, and main column copy from the fixture panel.
      </p>
      <div className="rounded-lg border overflow-hidden min-h-[420px]">
        <SidebarProvider className="min-h-[420px]">
          <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border">
              <p className="text-sm font-semibold px-2">{brand}</p>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={nav1}>{nav1}</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={nav2}>{nav2}</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={nav3}>{nav3}</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-14 items-center gap-2 border-b px-4">
              <SidebarTrigger />
              <span className="text-sm font-medium">{mainTitle}</span>
            </header>
            <main className="p-4 text-sm text-muted-foreground">{mainHint}</main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </FixtureWrapper>
  )
}
