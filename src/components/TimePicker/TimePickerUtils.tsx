// TimePickerUtils.ts

import { IDuration } from '@/interfaces/global'

/**
 * Regular expression to check for valid duration hour format (any non-negative integer)
 */
export function isValidDurationHour(value: string) {
  return /^[0-9]*$/.test(value) // Allows any number of digits, including empty string
}

/**
 * Regular expression to check for valid minute or second format (00-59)
 */
export function isValidMinuteOrSecond(value: string) {
  return /^([0-5][0-9])?$/.test(value) // Allows empty string or 00-59
}

type GetValidNumberConfig = { max: number; min?: number; loop?: boolean }

export function getValidNumber(
  value: string,
  { max, min = 0, loop = false }: GetValidNumberConfig
) {
  let numericValue = parseInt(value, 10)

  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max
      if (numericValue < min) numericValue = min
    } else {
      if (numericValue > max) numericValue = min
      if (numericValue < min) numericValue = max
    }
    return numericValue.toString().padStart(2, '0')
  }

  return '00'
}

export function getValidDurationHour(value: string) {
  if (isValidDurationHour(value)) return value
  return getValidNumber(value, { min: 0, max: 999, loop: false }) // Adjust max as needed
}

export function getValidMinuteOrSecondValue(value: string) {
  if (isValidMinuteOrSecond(value)) return value
  return getValidNumber(value, { max: 59 })
}

type GetValidArrowNumberConfig = {
  min: number
  max: number
  step: number
}

export function getValidArrowNumber(
  value: string,
  { min, max, step }: GetValidArrowNumberConfig
) {
  let numericValue = parseInt(value, 10)
  if (!isNaN(numericValue)) {
    numericValue += step
    return getValidNumber(String(numericValue), { min, max, loop: true })
  }
  return '00'
}

export function getValidArrowHour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 999, step }) // Adjust max as needed
}

export function getValidArrowMinuteOrSecond(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 59, step })
}

/**
 * Sets the hours in the duration object
 */
export function setHours(duration: IDuration, value: string) {
  const hours = value === '' ? 0 : parseInt(getValidDurationHour(value), 10)
  return { ...duration, hours }
}

/**
 * Sets the minutes in the duration object
 */
export function setMinutes(duration: IDuration, value: string) {
  const minutes =
    value === '' ? 0 : parseInt(getValidMinuteOrSecondValue(value), 10)
  return { ...duration, minutes }
}

/**
 * Sets the seconds in the duration object
 */
export function setSeconds(duration: IDuration, value: string) {
  const seconds =
    value === '' ? 0 : parseInt(getValidMinuteOrSecondValue(value), 10)
  return { ...duration, seconds }
}

export type TimePickerType = 'minutes' | 'seconds' | 'hours'

export function setDurationByType(
  duration: IDuration,
  value: string,
  type: TimePickerType
): IDuration {
  switch (type) {
    case 'minutes':
      return setMinutes(duration, value)
    case 'seconds':
      return setSeconds(duration, value)
    case 'hours':
      return setHours(duration, value)
    default:
      return duration
  }
}

export function getDurationByType(duration: IDuration, type: TimePickerType) {
  switch (type) {
    case 'minutes':
      return duration.minutes.toString().padStart(2, '0')
    case 'seconds':
      return duration.seconds.toString().padStart(2, '0')
    case 'hours':
      return duration.hours.toString()
    default:
      return ''
  }
}

export function getArrowByType(
  value: string,
  step: number,
  type: TimePickerType
) {
  switch (type) {
    case 'minutes':
      return getValidArrowMinuteOrSecond(value, step)
    case 'seconds':
      return getValidArrowMinuteOrSecond(value, step)
    case 'hours':
      return getValidArrowHour(value, step)
    default:
      return '00'
  }
}
