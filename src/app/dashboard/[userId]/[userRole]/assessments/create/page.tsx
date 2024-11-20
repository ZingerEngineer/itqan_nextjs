'use client'
import AssessmentWizard from '@/components/AssessmentWizard'
import { AssessmentProvider } from '@/providers/AssessmentProvider'
import { AssessmentWizardProvider } from '@/providers/AssessmentWizardProvider'

export default function CreateAssessment() {
  return (
    <div className="overflow-hidden w-full min-h-screen flex flex-col justify-center items-center">
      <AssessmentProvider>
        <AssessmentWizardProvider>
          <AssessmentWizard />
        </AssessmentWizardProvider>
      </AssessmentProvider>
    </div>
  )
}
