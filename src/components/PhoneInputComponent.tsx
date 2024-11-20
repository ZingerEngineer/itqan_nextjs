'use client'

import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import PhoneInput, { CountryData } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface PhoneInputComponentProps {
  dropDownStyle?: React.CSSProperties
  inputClass?: string
  containerClass?: string
  buttonClass?: React.CSSProperties
  htmlFor: string
  label: string
  name: string
  id: string
  value: string
  onChange: (
    value: string,
    country: CountryData,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  onBlur?: () => void
  errorHappened: boolean
}

const PhoneInputComponent = forwardRef<
  HTMLInputElement,
  PhoneInputComponentProps
>(
  (
    { htmlFor, label, name, id, errorHappened, value, onChange, onBlur },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    return (
      <div className="phone-input-area-wrapper flex flex-col justify-center w-full">
        <label
          htmlFor={htmlFor}
          className={
            errorHappened
              ? 'text-red-500 text-sm font-medium'
              : 'text-primary-500 text-sm font-medium'
          }
        >
          {label}
        </label>
        <div
          className="phone-input-wrapper w-full relative"
          style={{ width: '100%', position: 'relative' }}
        >
          <PhoneInput
            dropdownStyle={{
              backgroundColor: '#ffffff',
              border: errorHappened ? '1px solid #fca5a5' : '1px solid #d1d5db',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.375rem'
            }}
            inputStyle={{
              padding: '0.75rem',
              backgroundColor: '#ffffff',
              borderRadius: '0.375rem',
              border: errorHappened ? '2px solid #ef4444' : '2px solid #036666', // Teal color
              color: errorHappened ? '#f87171' : '#4b5563',
              paddingLeft: '3.5rem',
              width: '100%',
              height: '100%',
              fontWeight: '500',
              outlineColor: errorHappened ? '#fca5a5' : '#036666', // Teal color
              transitionDuration: '150ms'
            }}
            country={'sa'}
            value={value}
            onChange={onChange}
            inputProps={{
              name: name,
              id: id,
              ref: inputRef,
              onBlur: onBlur
            }}
            placeholder="Phone number"
            containerStyle={{
              backgroundColor: '#ffffff',
              border: 'none',
              color: errorHappened ? '#f87171' : '#4b5563',
              width: '100%',
              height: '3.25rem',
              fontWeight: '500',
              outlineColor: errorHappened ? '#fca5a5' : '#036666', // Teal color
              transitionDuration: '150ms'
            }}
            buttonStyle={{
              backgroundColor: '#ffffff',
              border: errorHappened ? '2px solid #ef4444' : '2px solid #036666',
              paddingLeft: '0.2rem',
              paddingRight: '0.2rem',
              borderRadius: '0.375rem'
            }}
          />
        </div>
      </div>
    )
  }
)

PhoneInputComponent.displayName = 'PhoneInputComponent'

export default PhoneInputComponent
