'use client'

import FinalizeTestSection from './FinalizeTestsSection'
import FinalizeAssessmentSection from './FinalizeAssessmentSection'
import FinalizeQuestionSection from './FinalizeQuestion'
import useAssessment from '@/hooks/useAssessment'
import TestFianlizeCard from './TestFinalizeCard'

export default function AssessmentFinalize() {
  const { state } = useAssessment()
  return (
    <div className="space-y-8 p-6">
      <FinalizeAssessmentSection />

      {state.tests && state.tests.length > 0 ? <TestFianlizeCard /> : null}

      {state.questions && state.questions.length > 0 ? (
        <FinalizeQuestionSection />
      ) : null}
    </div>
  )
}
