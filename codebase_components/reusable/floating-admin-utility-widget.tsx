import { FloatingAdminUtilityButton } from "./floating-admin-utility-button"
import { FloatingAdminUtilityBubbles } from "./floating-admin-utility-bubbles"
import { FloatingAdminToolWindow } from "./floating-admin-tool-window"
import { ShipmentTrackingSearch } from "./shipment-tracking-search"
import { QuoteEstimationCalculator } from "./quote-estimation-calculator"
import { DistanceCalculator } from "./distance-calculator"
import { UnitConverter } from "./unit-converter"
import { QuickNoteTaker } from "./quick-note-taker"
import { useStore } from "@/store"
import { Calculator, Gauge, MapPin, Search, StickyNote } from "lucide-react"
import { useState } from "react"

export function FloatingAdminUtilityWidget() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openTool, setOpenTool] = useState<string | null>(null)
  const { isAdmin, isAuthenticated } = useStore()

  // Only show widget for admins
  if (!isAuthenticated || !isAdmin) {
    return null
  }

  const tools = [
    {
      id: "shipment-search",
      name: "Shipment Search",
      icon: Search,
      onClick: () => {
        setOpenTool("shipment-search")
        setIsMenuOpen(false)
      },
    },
    {
      id: "quote-estimator",
      name: "Quote Estimation Calculator",
      icon: Calculator,
      onClick: () => {
        setOpenTool("quote-estimator")
        setIsMenuOpen(false)
      },
    },
    {
      id: "distance-calculator",
      name: "Distance Calculator",
      icon: MapPin,
      onClick: () => {
        setOpenTool("distance-calculator")
        setIsMenuOpen(false)
      },
    },
    {
      id: "unit-converter",
      name: "Unit Converter",
      icon: Gauge,
      onClick: () => {
        setOpenTool("unit-converter")
        setIsMenuOpen(false)
      },
    },
    {
      id: "quick-note-taker",
      name: "Quick Note Taker",
      icon: StickyNote,
      onClick: () => {
        setOpenTool("quick-note-taker")
        setIsMenuOpen(false)
      },
    },
  ]

  const handleCloseTool = () => {
    setOpenTool(null)
  }

  return (
    <>
      <FloatingAdminUtilityButton onClick={() => setIsMenuOpen(!isMenuOpen)} />
      <FloatingAdminUtilityBubbles
        open={isMenuOpen}
        tools={tools}
        onClose={() => setIsMenuOpen(false)}
      />
      <FloatingAdminToolWindow
        open={openTool === "shipment-search"}
        onClose={handleCloseTool}
        title="Shipment Search">
        <ShipmentTrackingSearch />
      </FloatingAdminToolWindow>
      <FloatingAdminToolWindow
        open={openTool === "quote-estimator"}
        onClose={handleCloseTool}
        title="Quote Estimation Calculator">
        <QuoteEstimationCalculator />
      </FloatingAdminToolWindow>
      <FloatingAdminToolWindow
        open={openTool === "distance-calculator"}
        onClose={handleCloseTool}
        title="Distance Calculator">
        <DistanceCalculator />
      </FloatingAdminToolWindow>
      <FloatingAdminToolWindow
        open={openTool === "unit-converter"}
        onClose={handleCloseTool}
        title="Unit Converter">
        <UnitConverter />
      </FloatingAdminToolWindow>
      <FloatingAdminToolWindow
        open={openTool === "quick-note-taker"}
        onClose={handleCloseTool}
        title="Quick Note Taker">
        <QuickNoteTaker />
      </FloatingAdminToolWindow>
    </>
  )
}
