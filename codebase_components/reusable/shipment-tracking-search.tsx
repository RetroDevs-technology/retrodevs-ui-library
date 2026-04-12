import { Input } from "@/components/ui"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { adminService } from "@/services/admin.service"
import { getRoutePath } from "@/config/get-route-path"
import { useQuery } from "@tanstack/react-query"
import { Package, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { ShippingRequest } from "@/models/shippment_request.model"
import { formatDateTimeUTC } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { defaultTableParams } from "@/models/extra.model"

export function ShipmentTrackingSearch() {
  const [searchValue, setSearchValue] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const navigate = useNavigate()

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchValue])

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["admin-shipment-search", debouncedSearch],
    queryFn: () =>
      adminService.getAllShippingRequests({
        ...defaultTableParams,
        search: debouncedSearch,
      }),
    enabled: !!debouncedSearch && debouncedSearch.length >= 3,
  })

  const shipments = searchResults?.data || []

  const handleShipmentClick = (shipment: ShippingRequest) => {
    navigate(
      getRoutePath("admin_shipment_details", {
        shipmentId: shipment.id,
      }),
    )
  }

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Enter tracking number..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 h-10 rounded-lg border-gray-200"
        />
      </div>

      {debouncedSearch.length < 3 && debouncedSearch.length > 0 && (
        <div className="text-sm text-muted-foreground text-center py-4">
          Enter at least 3 characters to search
        </div>
      )}

      {debouncedSearch.length >= 3 && (
        <ScrollArea className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            </div>
          ) : shipments.length > 0 ? (
            <div className="space-y-2">
              {shipments.map((shipment) => (
                <ShipmentSearchResultItem
                  key={shipment.id}
                  shipment={shipment}
                  onClick={() => handleShipmentClick(shipment)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
              <Package className="w-12 h-12 mb-3 text-gray-300" />
              <p className="font-medium text-gray-600 mb-1">No shipments found</p>
              <p className="text-sm text-gray-400">
                Try searching with a different tracking number
              </p>
            </div>
          )}
        </ScrollArea>
      )}

      {!debouncedSearch && (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <Search className="w-12 h-12 mb-3 text-gray-300" />
          <p className="font-medium text-gray-600 mb-1">Search for Shipments</p>
          <p className="text-sm text-gray-400 text-center">
            Enter a tracking number to quickly find and navigate to shipment details
          </p>
        </div>
      )}
    </div>
  )
}

interface ShipmentSearchResultItemProps {
  shipment: ShippingRequest
  onClick: () => void
}

function ShipmentSearchResultItem({ shipment, onClick }: ShipmentSearchResultItemProps) {
  const statusColors: Record<string, string> = {
    created: "bg-gray-100 text-gray-800",
    approved: "bg-blue-100 text-blue-800",
    assigned: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-green-100 text-green-800",
    completed: "bg-purple-100 text-purple-800",
    cancelled: "bg-red-100 text-red-800",
    delayed: "bg-orange-100 text-orange-800",
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full p-3 rounded-lg text-left transition-all",
        "hover:bg-gray-100 border border-gray-200",
        "flex flex-col gap-2",
      )}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="font-medium text-sm text-gray-900 truncate">
            {shipment.trackingNumber}
          </p>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap",
            statusColors[shipment.status] || "bg-gray-100 text-gray-800",
          )}>
          {shipment.status.replace("_", " ").toUpperCase()}
        </Badge>
      </div>
      {shipment.stops && shipment.stops.length > 0 && (
        <div className="text-xs text-gray-500 truncate">
          {shipment.stops[0]?.address?.addressString || "N/A"} →{" "}
          {shipment.stops[shipment.stops.length - 1]?.address?.addressString || "N/A"}
        </div>
      )}
      {shipment.createdAt && (
        <div className="text-xs text-gray-400">
          Created: {formatDateTimeUTC(shipment.createdAt)}
        </div>
      )}
    </button>
  )
}

