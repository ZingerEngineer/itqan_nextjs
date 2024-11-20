// components/InputComponent.tsx
import React from 'react'

interface InputComponentProps {
  overrideLabelErrorClass?: string
  overrideLabelClass?: string
  overrideInputClass?: string
  overrideInputErrorClass?: string
  labelHtmlFor: string
  labelText: string
  inputType: string
  inputPlaceholder: string
  inputName: string
  inputId: string
  value: string
  inputIcon?: React.ReactNode
  inputButton?: React.ReactNode
  errorCompliant: boolean
  error?: boolean
  errorMessage?: string | string[]
  inputDataCallBack: (inputValue: string) => void
}

const InputComponent: React.FC<InputComponentProps> = ({
  overrideLabelErrorClass,
  overrideLabelClass,
  overrideInputClass,
  overrideInputErrorClass,
  labelHtmlFor,
  labelText,
  inputType,
  inputPlaceholder,
  inputName,
  inputId,
  value,
  inputIcon,
  inputButton,
  errorCompliant,
  error,
  errorMessage,
  inputDataCallBack
}) => {
  return (
    <div className="input-area-wrapper flex flex-col justify-center w-full">
      <label
        htmlFor={labelHtmlFor}
        className={
          error
            ? !overrideLabelErrorClass
              ? 'text-red-500 text-sm font-medium'
              : ' text-red-500 text-sm font-medium' +
                ' ' +
                overrideLabelErrorClass
            : !overrideLabelClass
            ? 'text-primary-500 text-sm font-medium'
            : ' text-primary-500 text-sm font-medium' + ' ' + overrideLabelClass
        }
      >
        {labelText}
      </label>
      <div className="input-wrapper w-full relative">
        <input
          className={
            error
              ? !overrideInputErrorClass
                ? 'py-3 text-[0.8rem] bg-tertiary-light-500 rounded-md border-2 text-red-400 placeholder:text-red-500/40 pl-4 w-full text-secondary-light font-medium focus:outline-red-300 duration-150 border-red-500 overflow-ellipsis'
                : 'py-3 text-[0.8rem] bg-tertiary-light-500 rounded-md border-2 text-red-400 placeholder:text-red-500/40 pl-4 w-full text-secondary-light font-medium focus:outline-red-300 duration-150 border-red-500 overflow-ellipsis' +
                  ' ' +
                  overrideInputErrorClass
              : !overrideInputClass
              ? 'py-3 text-[0.8rem] bg-tertiary-light-500 rounded-md border-2 border-primary-500 text-gray-600 placeholder:text-gray-500/50e pl-4 w-full text-secondary-light font-medium focus:outline-primary-400 duration-150 overflow-ellipsis'
              : 'py-3 text-[0.8rem] bg-tertiary-light-500 rounded-md border-2 border-primary-500 text-gray-600 placeholder:text-gray-500/50e pl-4 w-full text-secondary-light font-medium focus:outline-primary-400 duration-150 overflow-ellipsis' +
                ' ' +
                overrideInputClass
          }
          onChange={(event) => {
            inputDataCallBack(event.currentTarget.value)
          }}
          id={inputId}
          name={inputName}
          type={inputType}
          placeholder={inputPlaceholder}
          value={value}
        />
        {inputButton && inputButton}
        {inputIcon && inputIcon}
      </div>

      {errorCompliant && error && errorMessage && (
        <div className="error-message-wrapper my-2 transition-all w-full text-sm text-red-500 flex flex-col">
          {typeof errorMessage === 'string' ? (
            <p>{errorMessage}</p>
          ) : (
            errorMessage.map((message, index) => (
              <p
                key={index}
                className="text-sm font-medium before:content-['\00A0●\00A0']"
              >
                {message}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default InputComponent
