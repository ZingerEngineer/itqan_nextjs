import React, { useContext } from 'react'
import { CheckIcon } from 'lucide-react'
import { IStep } from '@/interfaces/global'
import { useAssessmentWizard } from '@/providers/AssessmentWizardProvider'

interface ProgressBarProps {}

export default function ProgressBar({}: ProgressBarProps) {
  const { steps } = useAssessmentWizard()

  if (!steps || steps.length === 0) {
    return null // Or you could return a placeholder or error message
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ol className="flex items-center w-full">
        {steps.map((step: IStep, index: number) => (
          <li
            key={index}
            className={`flex items-center ${
              index !== steps.length - 1 ? 'w-full' : ''
            }`}
          >
            <div className="flex flex-col justify-center items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step.status === 'completed'
                    ? 'bg-primary border-primary text-primary-foreground'
                    : step.status === 'current'
                    ? 'border-primary text-primary'
                    : 'border-muted-foreground text-muted-foreground'
                }`}
              >
                {step.status === 'completed' ? (
                  <CheckIcon className="w-6 h-6" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={` text-sm font-medium ${
                  step.status === 'upcoming' ? 'text-muted-foreground' : ''
                }`}
              >
                {step.title}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 ${
                  step.status === 'completed' ? 'bg-primary' : 'bg-muted'
                }`}
              ></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
