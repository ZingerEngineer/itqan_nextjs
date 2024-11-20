// components/InputComponent.tsx
import React, { forwardRef } from 'react'

interface InputComponentProps {
  htmlFor: string
  label: string
  type: string
  placeHolder: string
  name: string
  id: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  errorHappened: boolean
}

const FormInputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
  (
    {
      htmlFor,
      label,
      type,
      name,
      placeHolder,
      id,
      errorHappened,
      value,
      onChange,
      onBlur
    },
    ref
  ) => {
    return (
      <div className="input-area-wrapper flex flex-col justify-center w-full">
        <label
          htmlFor={htmlFor}
          className={
            errorHappened
              ? ' text-red-500 text-sm font-medium'
              : 'text-primary-500 text-sm font-medium'
          }
        >
          {label}
        </label>
        <div className="input-wrapper w-full relative">
          <input
            className={
              errorHappened
                ? 'py-3 bg-white rounded-md border-2 text-red-400 placeholder:text-red-500/40 pl-4 w-full text-secondary-light font-medium focus:outline-red-300 duration-150 border-red-500'
                : 'py-3 bg-white rounded-md border-2 border-primary-500 text-gray-600 placeholder:text-gray-500/50e pl-4 w-full text-secondary-light font-medium focus:outline-primary-400 duration-150'
            }
            id={id}
            name={name}
            type={type}
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
        </div>
      </div>
    )
  }
)

FormInputComponent.displayName = 'FormInputComponent'

export default FormInputComponent
