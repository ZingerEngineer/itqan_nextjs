'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, ListOrdered } from 'lucide-react'
import { IDuration } from '@/interfaces/global'

interface TestCardProps {
  selectedTests: string[]
  id: string
  title: string
  type: string[]
  description: string
  duration: IDuration
  questionCount: number
  onToggleSelection?: (id: string, isSelected: boolean) => void
}

export default function TestCard({
  selectedTests,
  id,
  title,
  type,
  description,
  duration,
  questionCount,
  onToggleSelection
}: TestCardProps) {
  const isInitiallySelected = selectedTests.includes(id)
  const [isSelected, setIsSelected] = useState(isInitiallySelected)

  const handleToggle = () => {
    const newSelectedState = !isSelected
    setIsSelected(newSelectedState)
    if (onToggleSelection) {
      onToggleSelection(id, newSelectedState)
    }
  }

  return (
    <Card
      className={`flex flex-col justify-between lg:flex-grow-0 w-72 ${
        isSelected || selectedTests.includes(id) ? 'border-red-500' : ''
      }`}
    >
      <CardHeader>
        <div className="flex justify-between gap-2 items-center">
          <CardTitle className="whitespace-nowrap overflow-hidden text-ellipsis text-black font-bold text-[0.8rem]">
            {title}
          </CardTitle>
          {type.length > 2 ? (
            <span className="px-2 py-1 text-[0.6rem] font-semibold whitespace-nowrap bg-gray-200 text-gray-800 rounded-md">
              Various
            </span>
          ) : null}
          {type.length <= 2 &&
            type.map((t, index) => (
              <span
                key={`${t}+${index}`}
                className="px-2 py-1 text-[0.6rem] font-semibold whitespace-nowrap bg-gray-200 text-gray-800 rounded-md"
              >
                {t}
              </span>
            ))}
        </div>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <p className="max-w-[16rem] text-pretty text-ellipsis text-xs text-gray-600 mb-4 overflow-hidden">
          {description}
        </p>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {duration.hours}h {duration.minutes}m {duration.seconds}s
          </div>
          <div className="flex items-center">
            <ListOrdered className="w-4 h-4 mr-1" />
            {questionCount}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${
            isSelected || selectedTests.includes(id)
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-black hover:bg-gray-800'
          }`}
          onClick={handleToggle}
        >
          {isSelected || selectedTests.includes(id) ? 'Cancel' : 'Add'}
        </Button>
      </CardFooter>
    </Card>
  )
}
