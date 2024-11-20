'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { ITestsFilters } from '@/interfaces/global'

export default function FilterSection({
  filters,
  setFilters,
  onChangeCallback
}: {
  filters: ITestsFilters[]
  setFilters: (filters: ITestsFilters[]) => void
  onChangeCallback: (searchInputValue: string) => void
}) {
  const [activeFilters, setActiveFilters] = React.useState<
    Record<string, string | null>
  >({})

  const handleSelectOption = (filterName: string, option: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterName]: option
    }))
    setFilters(
      filters.map((filter) => {
        if (filter.name === filterName) {
          return {
            ...filter,
            isSelected: option
          }
        }
        return filter
      })
    )
  }

  const handleClearFilter = (filterName: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterName]: null
    }))
    setFilters(
      filters.map((filter) => {
        if (filter.name === filterName) {
          return {
            ...filter,
            isSelected: null
          }
        }
        return filter
      })
    )
  }

  return (
    <div className="w-full flex-grow max-w-4xl mx-auto  space-y-4 py-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search tests..."
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChangeCallback(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <DropdownMenu.Root key={filter.name}>
            <DropdownMenu.Trigger asChild>
              <Button
                variant={activeFilters[filter.name] ? 'default' : 'outline'}
                className="flex items-center gap-2 pointer-events-auto"
              >
                {filter.name}: {activeFilters[filter.name] || 'Any'}
                {activeFilters[filter.name] && (
                  <FontAwesomeIcon
                    icon={faX}
                    className="h-4 w-2 ml-2 cursor-pointer z-20"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClearFilter(filter.name)
                    }}
                  />
                )}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="bg-white rounded-md shadow-lg p-2 z-50">
                {filter.options.map((option, index) => (
                  <DropdownMenu.Item
                    key={`${option}-${index}`}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer rounded"
                    onClick={() => handleSelectOption(filter.name, option)}
                  >
                    {option}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ))}
      </div>
    </div>
  )
}
