'use client'

import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInputComponent from './FormInput'
import bayanLogo from '@/assets/images/bayan-consulting.png'
import Image from 'next/image'
import PhoneInputComponent from './PhoneInputComponent'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  businessEmail: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone number is required'),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(500, 'Message is too long')
    .optional()
    .or(z.literal(''))
})

type FormData = z.infer<typeof schema>

const ContactForm: React.FC = () => {
  const router = useRouter()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    const url = process.env.NEXT_PUBLIC_BACK_END_BASE_URL
    const res = await axios.post(`${url}/api/v1/contact`, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    if (res.status === 201) {
      router.push('/success')
    }
  }

  return (
    <div className=" rounded-2xl p-8 bg-primary-500 min-w-[35rem]">
      <div className="h-full w-full rounded-2xl px-14 py-12 bg-white flex flex-col justify-center items-center">
        <Image
          src={bayanLogo}
          alt="bayan-company-logo"
          className="w-60 p-5"
        />
        <div className="title font-bold text-gray-800 flex justify-center items-center text-2xl my-2">
          Contact Us
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center gap-2">
              <div>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <FormInputComponent
                      htmlFor="firstName"
                      label="First name"
                      type="text"
                      placeHolder="John"
                      id="firstName"
                      errorHappened={Boolean(errors.firstName?.message)}
                      {...field}
                    />
                  )}
                />
                {errors.firstName && (
                  <p className="absolute text-xs text-red-500 before:content-['\00A0●\00A0']">
                    {errors.firstName.message + '.'}
                  </p>
                )}
              </div>

              <div>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <FormInputComponent
                      htmlFor="lastName"
                      label="Last name"
                      type="text"
                      placeHolder="Doe"
                      id="lastName"
                      errorHappened={Boolean(errors.lastName?.message)}
                      {...field}
                    />
                  )}
                />
                {errors.lastName && (
                  <p className="absolute text-xs text-red-500 before:content-['\00A0●\00A0']">
                    {errors.lastName.message + '.'}
                  </p>
                )}
              </div>
            </div>

            <div className="relative flex flex-col justify-center items-start">
              <Controller
                name="businessEmail"
                control={control}
                render={({ field }) => (
                  <FormInputComponent
                    htmlFor="email"
                    label="Business Email"
                    type="email"
                    placeHolder="johndoe@example.com"
                    id="email"
                    errorHappened={Boolean(errors.businessEmail?.message)}
                    {...field}
                  />
                )}
              />
              {errors.businessEmail && (
                <p className="top-[4.55rem] absolute text-xs text-red-500 before:content-['\00A0●\00A0']">
                  {errors.businessEmail.message + '.'}
                </p>
              )}
            </div>

            <div className="relative">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInputComponent
                    htmlFor="phone"
                    label="Phone"
                    id="phone"
                    errorHappened={Boolean(errors.phone?.message)}
                    {...field}
                  />
                )}
              />
              {errors.phone && (
                <p className="absolute top-[4.55rem] text-xs text-red-500 before:content-['\00A0●\00A0']">
                  {errors.phone.message + '.'}
                </p>
              )}
            </div>

            <div className="relative flex flex-col justify-center items-start">
              <label
                className={`text-sm font-medium ${
                  errors.companySize?.message
                    ? 'text-red-500'
                    : 'text-primary-500'
                }`}
              >
                Company Size:
              </label>
              <select
                className={
                  errors.companySize?.message && errors.companySize
                    ? 'py-3 bg-white rounded-md border-2 text-red-400 placeholder:text-red-500/40 pl-4 w-full text-secondary-light font-medium focus:outline-red-300 duration-150 border-red-500'
                    : ' py-3 bg-white rounded-md border-2 border-primary-500 text-gray-600 placeholder:text-gray-500/50e pl-4 w-full text-secondary-light font-medium focus:outline-primary-400 duration-150'
                }
                {...register('companySize')}
              >
                <option
                  value=""
                  className="text-gray-500"
                >
                  Select...
                </option>
                <option
                  value="1-10"
                  className="text-gray-500"
                >
                  1-10
                </option>
                <option
                  value="11-50"
                  className="text-gray-500"
                >
                  11-50
                </option>
                <option
                  value="51-200"
                  className="text-gray-500"
                >
                  51-200
                </option>
                <option
                  value="201-500"
                  className="text-gray-500"
                >
                  201-500
                </option>
                <option
                  value="500+"
                  className="text-gray-500"
                >
                  500+
                </option>
              </select>
              {errors.companySize && (
                <p className="absolute top-[4.4rem] text-xs text-red-500 before:content-['\00A0●\00A0']">
                  Please select a company size.
                </p>
              )}
            </div>

            <div className="relative flex flex-col">
              <label
                className={`text-sm font-medium ${
                  errors.message?.message ? 'text-red-500' : 'text-primary-500'
                }`}
              >
                Leave a message:
              </label>
              <textarea
                className={
                  errors.message?.message && errors.message
                    ? 'py-3 bg-white rounded-md border-2 text-red-400 placeholder:text-red-500/40 pl-4 w-full text-secondary-light font-medium focus:outline-red-300 duration-150 border-red-500'
                    : 'py-3 bg-white rounded-md border-2 border-primary-500 text-gray-600 placeholder:text-gray-500/50e pl-4 w-full text-secondary-light font-medium focus:outline-primary-400 duration-150'
                }
                {...register('message')}
              />
              {errors.message && (
                <p className="absolute top-[6rem] text-xs text-red-500 before:content-['\00A0●\00A0']">
                  {errors.message.message + '.'}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => handleSubmit(onSubmit)}
            className="mt-12 font-semibold p-3 bg-primary-500 rounded-lg text-primary-dark w-full hover:bg-primary-400 duration-150"
            type="submit"
          >
            Submit
          </button>
          <div className="w-full flex justify-center p-2">
            <p className="text-secondary-light text-sm font-medium">
              Already have an account?{' '}
              <Link
                href="/contactus"
                className="text-primary-500 font-semibold hover:text-primary-400 duration-150"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
