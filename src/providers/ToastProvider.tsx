'use client'

import 'react-toastify/dist/ReactToastify.css'
import '@/app/globals.css'
import { ToastContainer } from 'react-toastify'

interface ToastProviderProps {
  children: React.ReactNode
}
export default function ToastProvider({ children }: ToastProviderProps) {
  const contextClass = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-gray-600',
    warning: 'bg-orange-400',
    default: 'bg-teal-600',
    dark: 'bg-white-600 font-gray-300'
  }

  return (
    <>
      {children}
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || 'default'] +
          ' relative flex p-2 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
        }
        bodyClassName={() =>
          'flex flex-row items-center text-sm font-white font-med block p-3'
        }
        position="bottom-left"
        autoClose={3000}
      />
    </>
  )
}
