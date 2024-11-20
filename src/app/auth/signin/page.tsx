'use client'
import { useState, FormEvent, useCallback, useEffect } from 'react'
import bayanLogo from '../../../assets/images/bayan-consulting.png'
import Link from 'next/link'
import { formDataSchema } from '../../../schemas/formDataSchema'
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'
import InputComponent from '../../../components/InputComponent'
import Image from 'next/image'
import { useAuth } from '@/providers/AuthProvider'
import { showToast } from '@/utils/showToast'
export default function SignInForm() {
  const [togglePassword, setTogglePassword] = useState(false)
  const [currentEmail, setCurrentEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const submitFlow = async () => {
    const checkRes = formDataSchema.safeParse({ email: currentEmail, password })
    if (!checkRes.success) {
      showToast('error', 'Invalid input.')
      return
    }
    try {
      await login(currentEmail, password)
      showToast('success', 'Login successful.', {
        className: 'bg-green-500 text-white'
      })
    } catch (error) {
      showToast('error', 'Login failed.')
    }
  }
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()

    await submitFlow()
  }

  const handleButtonSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()
    await submitFlow()
  }

  const handlePasswordButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation() // Stop the click event from propagating
    setTogglePassword(!togglePassword)
  }

  return (
    <div className="rounded-2xl p-8 bg-primary-500 min-w-[30rem]">
      <div className="h-full w-full rounded-2xl px-14 py-12 bg-white flex flex-col justify-center items-center">
        <Image
          src={bayanLogo}
          alt="bayan-company-logo"
          className="w-60 p-5"
        />

        <form
          className="flex flex-col items-end w-full"
          onSubmit={(event: FormEvent<HTMLFormElement>) =>
            handleFormSubmit(event)
          }
        >
          <div className="all-inputs-wrapper flex flex-col justify-center items-center gap-4 w-full">
            <InputComponent
              value={currentEmail}
              labelHtmlFor="email"
              labelText="Email address"
              inputType="text"
              inputId="email"
              inputName="email"
              inputPlaceholder="johndoe@example.com"
              inputIcon={
                <EnvelopeIcon className="w-5 text-secondary-light absolute top-[0.9rem] right-3 hover:text-primary-400" />
              }
              inputDataCallBack={(inputValue) => {
                setCurrentEmail(inputValue)
              }}
              errorCompliant={false}
            />
            <InputComponent
              value={password}
              labelHtmlFor="password"
              labelText="Password"
              inputType={!togglePassword ? 'password' : 'text'}
              inputId="password"
              inputName="password"
              inputPlaceholder="●●●●●●●●"
              inputButton={
                <button
                  className="input-toggler w-5 text-secondary-light absolute top-[0.9rem] right-3 hover:text-primary-400 duration-150"
                  onClick={(event) => handlePasswordButtonClick(event)}
                >
                  {!togglePassword ? <EyeIcon /> : <EyeSlashIcon />}
                </button>
              }
              inputDataCallBack={(inputValue) => {
                setPassword(inputValue)
              }}
              errorCompliant={false}
            />
          </div>
          <Link
            href="/contactus"
            className="my-4 text-sm text-primary-500 font-semibold hover:text-primary-400 duration-150"
          >
            Forgot password?
          </Link>

          <button
            className="font-semibold p-3 bg-primary-500 rounded-lg text-primary-dark w-full hover:bg-primary-400 duration-150"
            onClick={(event) => handleButtonSubmit(event)}
          >
            Sign in
          </button>
          <div className="w-full flex justify-center p-2">
            <p className="text-secondary-light text-sm font-medium">
              Don&apos;t have an account?{' '}
              <Link
                href="/contactus"
                className="text-primary-500 font-semibold hover:text-primary-400 duration-150"
              >
                Contact us
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
