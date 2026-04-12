import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { SearchResult } from "@/models/search.model"
import {
  Boxes,
  FileText,
  Package,
  Receipt,
  User,
  Users,
  Briefcase,
  Mail,
  ClipboardCheck,
} from "lucide-react"

interface SearchResultCardProps {
  result: SearchResult
  isHighlighted?: boolean
  onClick?: () => void
}

function getTypeIcon(type: string) {
  const iconClass = "size-4"
  switch (type) {
    case "shipping_request":
      return <Package className={iconClass} />
    case "contact":
      return <User className={iconClass} />
    case "invoice":
      return <Receipt className={iconClass} />
    case "earning":
      return <FileText className={iconClass} />
    case "driver":
      return <Briefcase className={iconClass} />
    case "customer":
      return <Users className={iconClass} />
    case "admin":
      return <Users className={iconClass} />
    case "public_quote_request":
      return <ClipboardCheck className={iconClass} />
    case "public_job_application":
      return <Briefcase className={iconClass} />
    case "public_contact":
      return <Mail className={iconClass} />
    default:
      return <Boxes className={iconClass} />
  }
}

function getTypeBadgeColor(type: string) {
  switch (type) {
    case "shipping_request":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "contact":
      return "bg-green-100 text-green-800 border-green-200"
    case "invoice":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "earning":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "driver":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "customer":
      return "bg-cyan-100 text-cyan-800 border-cyan-200"
    case "admin":
      return "bg-pink-100 text-pink-800 border-pink-200"
    case "public_quote_request":
      return "bg-indigo-100 text-indigo-800 border-indigo-200"
    case "public_job_application":
      return "bg-teal-100 text-teal-800 border-teal-200"
    case "public_contact":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function formatTypeLabel(type: string): string {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function SearchResultCard({
  result,
  isHighlighted = false,
  onClick,
}: SearchResultCardProps) {
  return (
    <button
      type="button"
      aria-selected={isHighlighted}
      onClick={onClick}
      className={cn(
        "w-full text-left flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
        "hover:bg-gray-50 border border-transparent hover:border-gray-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isHighlighted && "bg-blue-50 border-blue-200",
      )}>
      <div className="flex-shrink-0 mt-0.5 text-muted-foreground">
        {getTypeIcon(result.type)}
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium text-gray-900 truncate">{result.title}</h4>
          <Badge
            variant="outline"
            className={cn(
              "text-xs px-2 py-0.5 shrink-0",
              getTypeBadgeColor(result.type),
            )}>
            {formatTypeLabel(result.type)}
          </Badge>
        </div>
        <p className="text-xs text-gray-600 line-clamp-2">{result.description}</p>
        {result.metadata && Object.keys(result.metadata).length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {result.metadata.status && (
              <span className="text-xs text-gray-500">
                Status: <span className="font-medium">{result.metadata.status}</span>
              </span>
            )}
            {result.metadata.trackingNumber && (
              <span className="text-xs text-gray-500">
                Tracking: <span className="font-medium">{result.metadata.trackingNumber}</span>
              </span>
            )}
            {result.metadata.poNumber && (
              <span className="text-xs text-gray-500">
                PO: <span className="font-medium">{result.metadata.poNumber}</span>
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  )
}

