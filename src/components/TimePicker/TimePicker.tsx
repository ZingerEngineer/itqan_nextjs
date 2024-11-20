// TimePicker.tsx

'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'
import { TimePickerInput } from './TimePickerInput'
import { IDuration } from '@/interfaces/global'
interface TimePickerProps {
  duration: IDuration
  setDuration: (duration: IDuration) => void
}

export default function TimePicker({
  children,
  duration,
  setDuration
}: React.PropsWithChildren<TimePickerProps>) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const secondRef = React.useRef<HTMLInputElement>(null)

  const onHoursChange = (value: string) => {
    // Limit the input to numeric values and max 3 digits
    if (/^\d{0,3}$/.test(value)) {
      setDuration({
        ...duration,
        hours: value === '' ? 0 : parseInt(value, 10)
      })
    }
    const newHours = value === '' ? 0 : parseInt(value, 10)
    const hoursString = newHours.toString().padStart(3, '0')
    const updatedHours = parseInt(hoursString.slice(-3), 10)
    setDuration({
      ...duration,
      hours: updatedHours
    })
  }

  const onMinutesChange = (value: string) => {
    setDuration({
      ...duration,
      minutes: value === '' ? 0 : parseInt(value, 10)
    })
  }

  const onSecondsChange = (value: string) => {
    setDuration({
      ...duration,
      seconds: value === '' ? 0 : parseInt(value, 10)
    })
  }

  return (
    <div className="flex items-center gap-2">
      {/* Hours */}
      <div className="flex flex-col justify-center items-center gap-1 text-center flex-grow">
        <Label
          htmlFor="hours"
          className="text-xs"
        >
          Hours
        </Label>
        <TimePickerInput
          className="w-full"
          picker="hours"
          duration={duration}
          setDuration={(newDuration) =>
            onHoursChange(newDuration.hours.toString())
          }
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <span className="mt-[1.32rem] font-bold">:</span>

      {/* Minutes */}
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <Label
          htmlFor="minutes"
          className="text-xs"
        >
          Minutes
        </Label>
        <TimePickerInput
          className="w-full"
          picker="minutes"
          duration={duration}
          setDuration={(newDuration) =>
            onMinutesChange(newDuration.minutes.toString())
          }
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <span className="mt-[1.32rem] font-bold">:</span>

      {/* Seconds */}
      <div className="flex flex-col justify-center items-center gap-1 text-center">
        <Label
          htmlFor="seconds"
          className="text-xs"
        >
          Seconds
        </Label>
        <TimePickerInput
          className="w-full"
          picker="seconds"
          duration={duration}
          setDuration={(newDuration) =>
            onSecondsChange(newDuration.seconds.toString())
          }
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>

      {children}
    </div>
  )
}
