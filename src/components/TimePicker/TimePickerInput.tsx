// TimePickerInput.tsx

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'
import {
  TimePickerType,
  getArrowByType,
  getDurationByType,
  isValidDurationHour,
  isValidMinuteOrSecond,
  setDurationByType
} from './TimePickerUtils'
import { IDuration } from '@/interfaces/global'

export interface TimePickerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerType
  duration: IDuration
  setDuration: (duration: IDuration) => void
  onRightFocus?: () => void
  onLeftFocus?: () => void
}

const TimePickerInput = React.forwardRef<
  HTMLInputElement,
  TimePickerInputProps
>(
  (
    {
      className,
      type = 'tel',
      value,
      id,
      name,
      duration,
      setDuration,
      onChange,
      onKeyDown,
      picker,
      onLeftFocus,
      onRightFocus,
      ...props
    },
    ref
  ) => {
    const [flag, setFlag] = React.useState<boolean>(false)
    const [prevIntKey, setPrevIntKey] = React.useState<string>('')

    /**
     * Allow the user to enter the second digit within 2 seconds
     * Otherwise, start again with entering the first digit
     */
    React.useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => {
          setFlag(false)
        }, 2000)

        return () => clearTimeout(timer)
      }
    }, [flag])

    const calculatedValue = React.useMemo(() => {
      return getDurationByType(duration, picker)
    }, [duration, picker])

    const calculateNewValue = (key: string) => {
      if (picker === 'hours') {
        // For hours, allow multiple digits
        return duration.hours.toString() === '0'
          ? key
          : duration.hours.toString() + key
      }

      return !flag ? '0' + key : calculatedValue.slice(1, 2) + key
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab') return
      e.preventDefault()
      if (e.key === 'ArrowRight') onRightFocus?.()
      if (e.key === 'ArrowLeft') onLeftFocus?.()
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        const step = e.key === 'ArrowUp' ? 1 : -1
        const newValue = getArrowByType(calculatedValue, step, picker)
        if (flag) setFlag(false)
        const updatedDuration = setDurationByType(duration, newValue, picker)
        setDuration(updatedDuration)
      }
      if (e.key >= '0' && e.key <= '9') {
        if (picker === 'hours') setPrevIntKey(e.key)

        const newValue = calculateNewValue(e.key)
        if (picker === 'hours') {
          const updatedDuration = setDurationByType(duration, newValue, picker)
          setDuration(updatedDuration)
        } else {
          if (flag) onRightFocus?.()
          setFlag((prev) => !prev)
          const updatedDuration = setDurationByType(duration, newValue, picker)
          setDuration(updatedDuration)
        }
      }
      if (e.key === 'Backspace') {
        if (picker === 'hours') {
          const updatedHours = Math.floor(duration.hours / 10)
          setDuration({ ...duration, hours: updatedHours })
        } else {
          const updatedDuration = setDurationByType(duration, '0', picker)
          setDuration(updatedDuration)
        }
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value

      if (picker === 'hours') {
        if (isValidDurationHour(inputValue)) {
          const updatedDuration = setDurationByType(
            duration,
            inputValue,
            picker
          )
          setDuration(updatedDuration)
        }
      } else {
        if (isValidMinuteOrSecond(inputValue)) {
          const updatedDuration = setDurationByType(
            duration,
            inputValue,
            picker
          )
          setDuration(updatedDuration)
        }
      }
    }

    return (
      <Input
        maxLength={2}
        ref={ref}
        id={id || picker}
        name={name || picker}
        className={cn(
          'w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none',
          className
        )}
        value={calculatedValue}
        onChange={handleChange}
        type={type}
        inputMode="numeric"
        onKeyDown={(e) => {
          onKeyDown?.(e)
          handleKeyDown(e)
        }}
        {...props}
      />
    )
  }
)

TimePickerInput.displayName = 'TimePickerInput'

export { TimePickerInput }
