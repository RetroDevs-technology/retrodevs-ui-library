"use client"

import { BaseSelect } from "./base-select"
import { Button } from "@/components/ui/button"
import { TableSearch } from "./table-search"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DOTS_LEFT, DOTS_RIGHT, usePagination } from "@/hooks/use-pagination"
import type { PaginationMeta } from "@/models/pagination.model"
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import React from "react"

/**
 * Interface defining the structure of a table column.
 *
 * @interface
 * @template T - The type of data in the table rows
 */
export interface Column<T> {
  /** Unique identifier for the column */
  key: string
  /** Display title for the column header */
  title: string | React.ReactNode
  /** Width of the column */
  width?: string
  /** Whether the column can be sorted */
  sortable?: boolean
  /** Text alignment within the column */
  align?: "center" | "right" | "left"
  /** Whether to hide the column on mobile screens */
  hideOnMobile?: boolean
  /** Whether to hide the column on tablet screens */
  hideOnTablet?: boolean
  /** Custom render function for the column's content */
  render?: (value: unknown, item: T) => React.ReactNode
  /** Function to provide actions menu for the column */
  actions?: (item: T) => { menu: React.ReactNode }
}

/**
 * Interface defining the props for the table component.
 *
 * @interface
 * @template T - The type of data in the table rows
 */
interface BaseTableProps<T> {
  /** Array of data items to display in the table */
  data: T[]
  /** Column definitions for the table */
  columns: Column<T>[]
  /** Whether the table is in a loading state */
  isLoading?: boolean
  /** Message to display when the table is empty */
  emptyMessage?: string
  /** Additional CSS classes for the table element */
  className?: string
  /** Additional CSS classes for the table container */
  containerClassName?: string
  /** Title displayed above the table */
  title?: string
  /** Subtitle displayed below the title */
  subtitle?: string
  /** Content to display in the header section */
  headerContent?: React.ReactNode
  /** Content to display in the right side of the header */
  rightHeaderContent?: React.ReactNode
  /** Whether to show row numbers */
  isNumbered?: boolean
  /** Whether to show pagination */
  showPagination?: boolean
  /** Pagination metadata from server response */
  paginationMeta?: PaginationMeta
  /** Change page handler */
  changePage?: (page: number) => void
  /** Change items per page handler */
  changeRows?: (itemsPerPage: number) => void
  /** Empty state Component */
  EmptyStateComponent?: React.ReactNode
  /** Loading state Component */
  LoadingStateComponent?: React.ReactNode
  /** Whether to show search functionality */
  showSearch?: boolean
  /** Search placeholder text */
  searchPlaceholder?: string
  /** Current search value */
  searchValue?: string
  /** Search change handler */
  onSearchChange?: (value: string) => void
  /** Search submit handler */
  onSearchSubmit?: (value: string) => void
  /** Clear search handler */
  onSearchClear?: () => void
}

/**
 * Helper function to get a nested value from an object using a dot-notation path.
 *
 * @function
 * @template T - The type of the object
 * @param {T} obj - The object to get the value from
 * @param {string} path - The dot-notation path to the value
 * @returns {unknown} The value at the specified path, or undefined if not found
 */
function getNestedValue<T>(obj: T, path: string): unknown {
  return path.split(".").reduce((acc: any, part: string) => {
    return acc && acc[part] !== undefined ? acc[part] : undefined
  }, obj)
}

/**
 * Helper function to check if a value can be converted to a number.
 *
 * @function
 * @param {unknown} value - The value to check
 * @returns {boolean} Whether the value can be converted to a number
 */
function isNumeric(value: unknown): boolean {
  if (value === null || value === undefined || value === "") return false
  if (typeof value === "string" && value.trim() === "") return false
  return !Number.isNaN(Number(value))
}

/**
 * Helper function to compare values for sorting.
 *
 * @function
 * @param {unknown} a - First value to compare
 * @param {unknown} b - Second value to compare
 * @param {'asc' | 'desc'} direction - Sort direction
 * @returns {number} Comparison result (-1, 0, or 1)
 */
function compareValues(a: unknown, b: unknown, direction: "asc" | "desc"): number {
  // Handle null/undefined values
  if (a === undefined || a === null) return direction === "asc" ? -1 : 1
  if (b === undefined || b === null) return direction === "asc" ? 1 : -1

  // Check if both values can be converted to numbers
  if (isNumeric(a) && isNumeric(b)) {
    const numA = Number(a)
    const numB = Number(b)
    return direction === "asc" ? numA - numB : numB - numA
  }

  // String comparison for non-numeric values
  const strA = String(a).toLowerCase()
  const strB = String(b).toLowerCase()

  if (strA < strB) return direction === "asc" ? -1 : 1
  if (strA > strB) return direction === "asc" ? 1 : -1
  return 0
}

/**
 * A flexible table component that supports server-side pagination, custom rendering, and responsive design.
 * Built on top of Table, it provides a consistent way to display tabular data with various features.
 * Uses server-side pagination with meta object from API responses.
 *
 * @component
 * @template T - The type of data in the table rows
 * @example
 * ```tsx
 * // Basic usage
 * <BaseTable
 *   data={users}
 *   columns={[
 *     { key: 'name', title: 'Name' },
 *     { key: 'email', title: 'Email' },
 *     { key: 'role', title: 'Role' }
 *   ]}
 * />
 *
 * // Advanced usage with server-side pagination and search
 * <BaseTable
 *   data={products}
 *   columns={[
 *     { key: 'name', title: 'Product', sortable: true },
 *     {
 *       key: 'price',
 *       title: 'Price',
 *       render: (value) => `$${Number(value).toFixed(2)}`,
 *       align: 'right'
 *     },
 *     {
 *       key: 'actions',
 *       title: 'Actions',
 *       actions: (item) => ({
 *         menu: <ProductActions product={item} />
 *       })
 *     }
 *   ]}
 *   title="Products"
 *   subtitle="List of available products"
 *   isNumbered
 *   showPagination
 *   showSearch
 *   searchPlaceholder="Search products..."
 *   searchValue={searchQuery}
 *   onSearchChange={setSearchQuery}
 *   onSearchSubmit={(query) => handleSearch(query)}
 *   paginationMeta={response.meta}
 *   changePage={(page) => setQueryParams({ page })}
 *   changeRows={(perPage) => setQueryParams({ perPage })}
 * />
 * ```
 *
 * @param {T[]} data - Array of data items to display in the table (already paginated by server).
 * @param {Column<T>[]} columns - Column definitions for the table.
 * @param {boolean} [isLoading=false] - Whether the table is in a loading state.
 * @param {string} [emptyMessage='No data available'] - Message to display when the table is empty.
 * @param {string} [className=''] - Additional CSS classes for the table element.
 * @param {string} [containerClassName=''] - Additional CSS classes for the table container.
 * @param {string} [title] - Title displayed above the table.
 * @param {string} [subtitle] - Subtitle displayed below the title.
 * @param {ReactNode} [headerContent] - Content to display in the header section.
 * @param {ReactNode} [rightHeaderContent] - Content to display in the right side of the header.
 * @param {boolean} [isNumbered=false] - Whether to show row numbers.
 * @param {boolean} [showPagination=false] - Whether to show pagination.
 * @param {PaginationMeta} [paginationMeta] - Pagination metadata from server response.
 * @param {function} [changePage] - Handler for page changes.
 * @param {function} [changeRows] - Handler for items per page changes.
 * @param {boolean} [showSearch=false] - Whether to show search functionality.
 * @param {string} [searchPlaceholder] - Search input placeholder text.
 * @param {string} [searchValue] - Current search value.
 * @param {function} [onSearchChange] - Handler for search input changes.
 * @param {function} [onSearchSubmit] - Handler for search form submission.
 * @param {function} [onSearchClear] - Handler for clearing the search.
 *
 * @returns {JSX.Element} A table component with server-side pagination, custom rendering, and responsive features.
 */
export function BaseTable<T extends { id: string | number }>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "No data available",
  className = "",
  containerClassName = "",
  title,
  subtitle,
  headerContent,
  rightHeaderContent,
  isNumbered = false,
  showPagination = false,
  paginationMeta,
  changePage,
  changeRows,
  LoadingStateComponent,
  EmptyStateComponent,
  showSearch = false,
  searchPlaceholder = "Search by number / item / status...",
  searchValue = "",
  onSearchChange,
  onSearchSubmit,
  onSearchClear,
}: BaseTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null
    direction: "asc" | "desc"
  }>({
    key: null,
    direction: "asc",
  })

  const paginationRange = usePagination({
    currentPage: paginationMeta?.currentPage || 1,
    totalCount: paginationMeta?.total || 0,
    siblingCount: 1,
    pageSize: paginationMeta?.perPage || 10,
  })

  function handleSort(key: string) {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  // For server-side pagination, we don't sort or paginate the data locally
  // The data should already be sorted and paginated by the server
  const displayData = data

  if (isLoading) {
    return (
      <div className={`w-full h-48 flex items-center justify-center ${containerClassName}`}>
        {LoadingStateComponent ? (
          LoadingStateComponent
        ) : (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        )}
      </div>
    )
  }

  const lastPage = paginationMeta?.lastPage || 0
  const currentPage = paginationMeta?.currentPage || 1
  const itemsPerPage = paginationMeta?.perPage || 10

  function onNext() {
    if (currentPage === lastPage) return
    changePage?.(currentPage + 1)
  }

  function onPrevious() {
    if (currentPage === 1) return
    changePage?.(currentPage - 1)
  }

  return (
    <div
      className={`rounded-[12px] border-white-15 border-[1px] bg-background-secondary ${containerClassName}`}>
      {title && (
        <div className="flex gap-4 justify-between items-center p-[18px] border-b border-white-15">
          {/* Title Header Section */}
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-4">
              {title && (
                <p className="text-[14px] font-medium uppercase text-white-100">
                  {title}
                </p>
              )}
              {subtitle && (
                <p className="text-white-70 text-[10px]">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Search Component */}
            {showSearch && (
              <TableSearch
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={onSearchChange}
                onSubmit={onSearchSubmit}
                onClear={onSearchClear}
              />
            )}

            {/* Right Header Content */}
            {rightHeaderContent && (
              <div className="flex items-center justify-end">
                {rightHeaderContent}
              </div>
            )}
          </div>

          {/* Base Header Section */}
          {(headerContent ||
            rightHeaderContent) && (
              <div className="flex justify-between items-center ">
                <div className="flex items-center gap-4">
                  {headerContent}
                </div>
                {rightHeaderContent && (
                  <div className="flex items-center justify-end">
                    {rightHeaderContent}
                  </div>
                )}
              </div>
            )}
        </div>
      )
      }

      <div className="overflow-x-auto">
        <Table className={`${className} min-w-full`}>
          <TableHeader className="text-white-70 text-sm font-medium font-satoshi bg-table-gray">
            <TableRow>
              {isNumbered && (
                <TableHead className="w-[40px] text-center border-r border-white-15">#</TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={`
                    ${column.width || ""} 
                    ${column.align ? `text-${column.align}` : ""}
                    ${column.hideOnMobile ? "hidden sm:table-cell" : ""}
                    ${column.hideOnTablet ? "hidden md:table-cell" : ""}
                    whitespace-nowrap
                  `}>
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort(column.key)}
                      className=" p-0 font-medium text-white-70 text-xs">
                      {column.title}
                      <ChevronsUpDown className="ml-1 h-2 w-2 text-white-70" />
                    </Button>
                  ) : (
                    column.title
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm font-normal font-satoshi">
            {displayData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={isNumbered ? columns.length + 1 : columns.length}
                  className={
                    EmptyStateComponent
                      ? "p-0 align-middle text-muted-foreground min-h-[min(55vh,380px)]"
                      : "h-24 text-center text-muted-foreground"
                  }>
                  {EmptyStateComponent ? EmptyStateComponent : emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              displayData.map((item, index) => (
                <TableRow key={item.id}>
                  {isNumbered && (
                    <TableCell className="w-[40px] text-center border-r border-white-15">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={`
                      ${column.align ? `text-${column.align}` : ""}
                      ${column.hideOnMobile ? "hidden sm:table-cell" : ""}
                      ${column.hideOnTablet ? "hidden md:table-cell" : ""}
                      whitespace-nowrap
                    `}>
                      {column.actions ? (
                        <div className="flex justify-end">{column.actions(item).menu}</div>
                      ) : column.render ? (
                        column.render(getNestedValue(item, column.key), item)
                      ) : (
                        (() => {
                          const value = getNestedValue(item, column.key)

                          if (React.isValidElement(value)) {
                            return value
                          }

                          return String(value ?? "")
                        })()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {
        showPagination && paginationMeta && (
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <p className="text-sm font-normal font-satoshi text-muted-foreground hidden md:block">
                Items per page:
              </p>
              <BaseSelect
                items={[
                  { value: "10", label: "10" },
                  { value: "20", label: "20" },
                  { value: "30", label: "30" },
                  { value: "40", label: "40" },
                  { value: "50", label: "50" },
                ]}
                itemClassName="text-sm font-normal font-satoshi"
                triggerClassName="w-6"
                value={String(itemsPerPage)}
                onChange={(value) => {
                  if (typeof value === "string") {
                    changeRows?.(Number(value))
                  }
                }}
                placeholder={String(itemsPerPage)}
                className="w-[51px] p-0 h-fit flex items-center justify-center bg-white"
              />
            </div>

            <div className="flex items-center gap-5">
              <Pagination className="bg-white w-fit">
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={onPrevious}
                      disabled={currentPage === 1}
                      className="p-[7px] w-8 h-8 bg-white">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                  {paginationRange?.map((pageNumber: number | string) => {
                    if (pageNumber === DOTS_LEFT || pageNumber === DOTS_RIGHT) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }

                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault()
                            changePage?.(Number(pageNumber))
                          }}
                          isActive={currentPage === pageNumber}
                          className="p-[7px] w-8 h-8 bg-white">
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}
                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={onNext}
                      disabled={currentPage === lastPage}
                      className="p-[7px] w-8 h-8 bg-white">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              <span className="text-sm font-normal font-satoshi text-muted-foreground hidden md:block">
                Showing {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, paginationMeta.total)} of {paginationMeta.total}{" "}
                items
              </span>
            </div>
          </div>
        )
      }
    </div >
  )
}

export default BaseTable
