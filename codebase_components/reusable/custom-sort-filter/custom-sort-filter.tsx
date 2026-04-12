import { useEffect, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

// Type definitions for the filter and sort data structure
export interface FilterOption {
  id: string
  label: string
  count?: number
  selected?: boolean
}

export interface FilterCategory {
  id: string
  label: string
  options?: FilterOption[]
  isExpanded?: boolean
  component?: React.ComponentType<{
    options: FilterOption[]
    onToggle: (optionId: string) => void
    selectedOptions: string[]
  }>
}

export interface SortOption {
  id: string
  label: string
  value: string
  order?: 'asc' | 'desc'
}

export interface SortFilterData {
  categories: FilterCategory[]
  sortOptions: SortOption[]
  selectedSort?: string
  selectedSortOrder?: 'asc' | 'desc'
  selectedFilters?: Record<string, string[]>
  total?: number
  isSortExpanded?: boolean
}

interface SortFilterProps {
  isOpen: boolean
  onClose: () => void
  data: SortFilterData
  onApply: (filters: Record<string, string[]>, sort?: string, sortOrder?: 'asc' | 'desc') => void
  onReset: () => void
}

function SortFilter({ isOpen, onClose, data, onApply, onReset }: SortFilterProps) {

  // Initialize data
  const initializeData = (baseData: SortFilterData) => {
    return {
      ...baseData,
      isSortExpanded: baseData.isSortExpanded || false,
      categories: baseData.categories.map(category => ({
        ...category,
        options: category.options?.map(option => ({
          ...option,
          selected: baseData.selectedFilters?.[category.id]?.includes(option.id) || option.selected || false
        }))
      }))
    }
  }

  const [localData, setLocalData] = useState<SortFilterData>(() =>
    initializeData(data)
  )
  const [selectedSort, setSelectedSort] = useState<string>(() =>
    data.selectedSort || ''
  )
  const [selectedSortOrder, setSelectedSortOrder] = useState<'asc' | 'desc'>(() =>
    data.selectedSortOrder || 'desc'
  )

  const toggleCategory = (categoryId: string) => {
    setLocalData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId ? { ...cat, isExpanded: !cat.isExpanded } : cat
      )
    }))
  }

  const toggleOption = (categoryId: string, optionId: string) => {
    setLocalData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId
          ? {
            ...cat,
            options: cat.options?.map(opt =>
              opt.id === optionId ? { ...opt, selected: !opt.selected } : opt
            )
          }
          : cat
      )
    }))
  }

  const handleApply = () => {
    const filters: Record<string, string[]> = {}

    for (const category of localData.categories) {
      const selectedOptions = category.options
        ?.filter(option => option.selected)
        .map(option => option.id)

      if (selectedOptions && selectedOptions.length > 0) {
        filters[category.id] = selectedOptions
      }
    }

    onApply(filters, selectedSort, selectedSortOrder)
  }

  const handleReset = () => {
    // Reset local state
    setLocalData(prev => ({
      ...prev,
      categories: prev.categories.map(cat => ({
        ...cat,
        options: cat.options?.map(opt => ({ ...opt, selected: false }))
      }))
    }))
    setSelectedSort('')
    setSelectedSortOrder('desc')

    onReset()
  }

  // Get selected items for display
  const getSelectedItems = () => {
    const selectedFilters: Array<{ category: string; options: string[] }> = []
    const selectedSortOption = localData.sortOptions?.find(option => option.value === selectedSort)

    for (const category of localData.categories) {
      const selectedOptions = category.options?.filter(option => option.selected)
      if (selectedOptions && selectedOptions.length > 0) {
        selectedFilters.push({
          category: category.label,
          options: selectedOptions.map(opt => opt.label)
        })
      }
    }

    return { selectedFilters, selectedSortOption }
  }

  const { selectedFilters, selectedSortOption } = getSelectedItems()

  // Remove individual filter option
  const removeFilterOption = (categoryId: string, optionId: string) => {
    toggleOption(categoryId, optionId)
  }

  // Remove sort option
  const removeSortOption = () => {
    setSelectedSort('')
  }

  // Get selected option IDs for a category
  const getSelectedOptionIds = (categoryId: string) => {
    const category = localData.categories.find(cat => cat.id === categoryId)
    return category?.options?.filter(opt => opt.selected).map(opt => opt.id) || []
  }

  useEffect(() => {
    setLocalData(initializeData(data))
    setSelectedSort(data.selectedSort || '')
    setSelectedSortOrder(data.selectedSortOrder || 'desc')
  }, [data])

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Filter & Sort</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          {/* Selected Items Display */}
          {(selectedFilters.length > 0 || selectedSortOption) && (
            <div className="p-6 border-b">
              <div className="flex flex-wrap gap-2">
                {/* Selected Sort Pill */}
                {selectedSortOption && (
                  <div
                    className="flex items-center px-3 py-1.5 rounded-full border border-border bg-white cursor-pointer hover:bg-primary-100 transition-all duration-200"
                    onClick={removeSortOption}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        removeSortOption()
                      }
                    }}
                  >
                    <span className="text-sm text-foreground mr-2">
                      {selectedSortOption.label}
                    </span>
                    <X size={14} className="text-medium-gray" />
                  </div>
                )}

                {/* Selected Filter Pills */}
                {selectedFilters.map((filter) => (
                  <div key={filter.category} className="flex flex-wrap gap-2">
                    {filter.options.map((option) => {
                      // Find the category and option IDs for removal
                      const category = localData.categories.find(cat => cat.label === filter.category)
                      const optionObj = category?.options?.find(opt => opt.label === option)

                      return (
                        <div
                          key={option}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              category && optionObj && removeFilterOption(category.id, optionObj.id)
                            }
                          }}
                          className="flex items-center px-3 py-1.5 rounded-full border border-border bg-white cursor-pointer hover:bg-primary-100 transition-all duration-200"
                          onClick={() => category && optionObj && removeFilterOption(category.id, optionObj.id)}
                        >
                          <span className="text-sm text-foreground mr-2">
                            {option}
                          </span>
                          <X size={14} className="text-medium-gray" />
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sort Options */}
          {localData.sortOptions && localData.sortOptions.length > 0 && (
            <div>
              <div className="flex flex-col">
                {/* Sort Category Header */}
                <div
                  className="flex items-center justify-between py-4 px-6 cursor-pointer hover:transition-all duration-200 relative border-b"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setLocalData(prev => ({ ...prev, isSortExpanded: !prev.isSortExpanded }))
                    }
                  }}
                  onClick={() => setLocalData(prev => ({ ...prev, isSortExpanded: !prev.isSortExpanded }))}
                >
                  <span className="font-medium text-foreground text-sm">
                    Sort by
                  </span>
                  <div
                    className={cn(
                      "transition-transform duration-200 text-medium-gray",
                      localData.isSortExpanded ? "rotate-45" : "rotate-0"
                    )}
                  >
                    <Plus size={16} />
                  </div>
                </div>

                {/* Sort Options */}
                {localData.isSortExpanded && (
                  <div className="p-6 border-b">
                    <div className="space-y-3">
                      {localData.sortOptions.map(option => (
                        <div
                          key={option.id}
                          className={cn(
                            "flex items-center p-3 rounded-md cursor-pointer hover:bg-primary-100 transition-all duration-200 border",
                            selectedSort === option.value
                              ? "border-primary-200 bg-primary-100"
                              : "border-transparent"
                          )}
                          onClick={() => setSelectedSort(option.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setSelectedSort(option.value)
                            }
                          }}
                        >
                          <div className="flex items-center space-x-3 flex-1">
                            <div
                              className={cn(
                                "w-4 h-4 rounded-full border-2 relative",
                                selectedSort === option.value
                                  ? "border-primary bg-primary"
                                  : "border-border"
                              )}
                            >
                              {selectedSort === option.value && (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                            <span
                              className={cn(
                                "text-sm text-foreground",
                                selectedSort === option.value ? "font-medium" : "font-normal"
                              )}
                            >
                              {option.label}
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Sort Order Selection */}
                      {selectedSort && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="text-sm font-medium text-foreground mb-3">Sort Order</div>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              className={cn(
                                "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border",
                                selectedSortOrder === 'asc'
                                  ? "border-primary-200 bg-primary-100 text-primary"
                                  : "border-border bg-white text-foreground hover:bg-primary-50"
                              )}
                              onClick={() => setSelectedSortOrder('asc')}
                            >
                              Ascending
                            </button>
                            <button
                              type="button"
                              className={cn(
                                "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border",
                                selectedSortOrder === 'desc'
                                  ? "border-primary-200 bg-primary-100 text-primary"
                                  : "border-border bg-white text-foreground hover:bg-primary-50"
                              )}
                              onClick={() => setSelectedSortOrder('desc')}
                            >
                              Descending
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Filter Categories */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col">
              {localData.categories.map((category) => (
                <div key={category.id}>
                  {/* List-style Category Header */}
                  <div
                    className="flex items-center justify-between py-4 px-6 cursor-pointer hover:transition-all duration-200 relative border-b"
                    onClick={() => toggleCategory(category.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        toggleCategory(category.id)
                      }
                    }}
                  >
                    <span className="font-medium text-foreground text-sm">
                      {category.label}
                    </span>
                    <div
                      className={cn(
                        "transition-transform duration-200 text-medium-gray",
                        category.isExpanded ? "rotate-45" : "rotate-0"
                      )}
                    >
                      <Plus size={16} />
                    </div>
                  </div>

                  {/* Category Options */}
                  {category.isExpanded && (
                    <div className="p-6 border-b">
                      {category.component ? (
                        <category.component
                          options={category.options || []}
                          onToggle={(optionId) => toggleOption(category.id, optionId)}
                          selectedOptions={getSelectedOptionIds(category.id)}
                        />
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {category.options?.map(option => (
                            <div
                              key={option.id}
                              className={cn(
                                "p-3 rounded-md border cursor-pointer hover:bg-primary-100 hover:border-primary-200 hover:-translate-y-0.5 transition-all duration-200 relative",
                                option.selected
                                  ? "border-primary-200 bg-primary-100"
                                  : "border-transparent"
                              )}
                              onClick={() => toggleOption(category.id, option.id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  toggleOption(category.id, option.id)
                                }
                              }}
                            >
                              <div className="flex items-start space-x-3">
                                <Checkbox
                                  checked={option.selected}
                                  onCheckedChange={() => toggleOption(category.id, option.id)}
                                  className="mt-0.5"
                                />
                                <div className="flex flex-col space-y-1 flex-1">
                                  <span
                                    className={cn(
                                      "text-sm text-foreground leading-tight",
                                      option.selected ? "font-medium" : "font-normal"
                                    )}
                                  >
                                    {option.label}
                                  </span>
                                  <span className="text-xs text-medium-gray">
                                    {option.count}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-white sticky bottom-0 z-10">
            <div className="space-y-3">
              {/* Selected filters summary */}
              <div className="flex flex-wrap justify-center">
                <span className="text-xs text-medium-gray">
                  {localData.categories.reduce((total, cat) =>
                    total + (cat.options?.filter(opt => opt.selected).length || 0), 0
                  )} filters selected
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleReset}
                >
                  Reset All
                </Button>

                <Button
                  className="flex-1"
                  onClick={handleApply}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Example Grid Component for Size Options (like in the image)
export function SizeGridComponent({ options, onToggle, selectedOptions }: {
  options: FilterOption[]
  onToggle: (optionId: string) => void
  selectedOptions: string[]
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map(option => (
        <div
          key={option.id}
          className={cn(
            "p-3 rounded-md border cursor-pointer hover:bg-primary-100 hover:border-primary-200 hover:-translate-y-0.5 transition-all duration-200 text-center",
            selectedOptions.includes(option.id)
              ? "border-primary-200 bg-primary-100"
              : "border-border bg-white"
          )}
          onClick={() => onToggle(option.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onToggle(option.id)
            }
          }}
        >
          <div className="space-y-1">
            <span
              className={cn(
                "text-sm text-foreground leading-tight",
                selectedOptions.includes(option.id) ? "font-medium" : "font-normal"
              )}
            >
              {option.label}
            </span>
            <span className="text-xs text-medium-gray">
              ({option.count})
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// Example Color Swatch Component
export function ColorSwatchComponent({ options, onToggle, selectedOptions }: {
  options: FilterOption[]
  onToggle: (optionId: string) => void
  selectedOptions: string[]
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map(option => (
        <div
          key={option.id}
          className={cn(
            "w-8 h-8 rounded-md border-2 cursor-pointer hover:scale-110 transition-transform duration-200",
            selectedOptions.includes(option.id)
              ? "border-primary"
              : "border-border"
          )}
          style={{ backgroundColor: option.label }} // Assuming option.label contains the color value
          onClick={() => onToggle(option.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onToggle(option.id)
            }
          }}
        />
      ))}
    </div>
  )
}

export default SortFilter
