import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect
} from 'react'

interface IStep {
  title: string
  status: 'current' | 'completed' | 'upcoming'
}

interface AssessmentWizardContextProps {
  currentStep: number
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  steps: IStep[]
}

const AssessmentWizardContext = createContext<
  AssessmentWizardContextProps | undefined
>(undefined)

export const AssessmentWizardProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<IStep[]>([
    { title: 'Role Details', status: 'current' },
    { title: 'Choose tests', status: 'upcoming' },
    { title: 'Add questions', status: 'upcoming' },
    { title: 'Finalize', status: 'upcoming' }
  ])
  const updateSteps = useCallback(
    (step: number, operation: 'forward' | 'backward') => {
      setSteps((prevSteps) =>
        prevSteps.map((s, index) => {
          if (operation === 'forward') {
            if (index < step) return { ...s, status: 'completed' }
            if (index === step) return { ...s, status: 'current' }
          } else if (operation === 'backward') {
            if (index > step) return { ...s, status: 'upcoming' }
            if (index === step) return { ...s, status: 'current' }
          }
          return s
        })
      )
    },
    []
  )

  const nextStep = () => {
    setCurrentStep((prevStep) => {
      const newStep = prevStep + 1
      updateSteps(newStep, 'forward')
      return newStep
    })
  }

  const prevStep = () => {
    setCurrentStep((prevStep) => {
      const newStep = Math.max(prevStep - 1, 0)
      updateSteps(newStep, 'backward')
      return newStep
    })
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
    // Update steps status accordingly
    setSteps((prevSteps) =>
      prevSteps.map((s, index) => {
        if (index < step) return { ...s, status: 'completed' }
        if (index === step) return { ...s, status: 'current' }
        return { ...s, status: 'upcoming' }
      })
    )
  }

  return (
    <AssessmentWizardContext.Provider
      value={{ currentStep, nextStep, prevStep, goToStep, steps }}
    >
      {children}
    </AssessmentWizardContext.Provider>
  )
}

export const useAssessmentWizard = () => {
  const context = useContext(AssessmentWizardContext)
  if (!context) {
    throw new Error(
      'useAssessmentWizard must be used within an AssessmentWizardProvider'
    )
  }
  return context
}
