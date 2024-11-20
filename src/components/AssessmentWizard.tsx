'use client'
import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import ProgressBar from './ProgressBar'
import {
  IFinalizedAssessment,
  IFinalizedNewQuestion,
  IPendingAnswer,
  IPendingQuestion,
  IStep
} from '@/interfaces/global'
import QuestionBuilder from './QuestionBuilder/QuestionBuilder'
import AssessmentFinalize from './AssessmentFinalize/AssessmentFinalize'
import RoleDetailsSection from './AssessmentRoleDetailsSection.tsx/RoleDetailsSection'
import ChooseTestsSection from './ChooseTests/ChooseTestsSection'
import { QuestionProvider } from '@/providers/QuestionProvider'
import useAssessment from '@/hooks/useAssessment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faLanguage,
  faNewspaper
} from '@fortawesome/free-solid-svg-icons'
import capitalize from '@/utils/strings/capitalize'
import { useAssessmentWizard } from '@/providers/AssessmentWizardProvider'
import useQuestion from '@/hooks/useQuestion'
import axios from 'axios'
import { getCookie } from '@/utils/getCookie'
import { showToast } from '@/utils/showToast'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'

export default function AssessmentWizard() {
  const router = useRouter()
  const { user } = useAuth()
  const { state } = useAssessment()
  const { currentStep, nextStep, prevStep, goToStep, steps } =
    useAssessmentWizard()

  const handleFinalize = async () => {
    const pendingAssessment = state
    const pendingQuestions = state.questions

    const finalizedQuestions: IFinalizedNewQuestion[] = pendingQuestions.map(
      (question: IPendingQuestion) => {
        return {
          text: question.content,
          type: question.type,
          skill: state.jobRole,
          correctAnswer:
            question.answers && question.answers.length > 0
              ? question.answers.map((answer: IPendingAnswer) => {
                  return answer.answer
                })
              : []
        }
      }
    )
    const finalizedAssessment: IFinalizedAssessment = {
      title: pendingAssessment.name,
      description: pendingAssessment.description,
      jobRole: pendingAssessment.jobRole,
      newQuestions: finalizedQuestions,
      existingQuestions: pendingAssessment.existingQuestions,
      duration: pendingAssessment.duration.minutes
    }
    if (finalizedAssessment) {
      const url = process.env.NEXT_PUBLIC_BACK_END_BASE_URL
      const token = getCookie('Authorization')
      const res = await axios.post(
        `${url}/api/v1/assessments`,
        finalizedAssessment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      if (res.status === 201) {
        showToast('success', 'Assessment created successfully.', {
          className: 'bg-green-500 text-white'
        })
        router.push(`/dashboard/${user?._id}/${user?.role}/assessments`)
      } else {
        showToast('error', 'Assessment creation failed.', {
          className: 'bg-red-500 text-white'
        })
      }
    }
  }

  return (
    <div className="flex-1 w-full">
      <h1 className="text-2xl font-bold mb-4">Assessment creation:</h1>

      <Card>
        <CardHeader>
          <CardTitle>
            {state.name ? state.name : 'Untitled assessment'}
          </CardTitle>
          <CardDescription>
            <div>
              {state.description ? state.description : 'No description.'}
            </div>
            <div>
              <FontAwesomeIcon
                icon={faClock}
                className="mr-2"
              />
              {state.duration ? ` ${state.duration.hours} hours` : ''}
              {state.duration ? ` ${state.duration.minutes} minutes` : ''}
              {state.duration ? ` ${state.duration.seconds} seconds` : ''}
            </div>
            <div>
              <FontAwesomeIcon
                icon={faNewspaper}
                className="mr-2"
              />
              {state.tests ? `  ${state.tests.length} tests` : ''}
              {state.questions ? ` | ${state.questions.length} questions` : ''}
            </div>
            <div>
              <FontAwesomeIcon
                icon={faLanguage}
                className="mr-2"
              />
              {state.language ? `  ${capitalize(state.language)}` : ''}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress indicator */}
          <ProgressBar />

          {/* Step content */}
          <Tabs value={`step-${currentStep + 1}`}>
            <TabsContent value="step-1">
              <RoleDetailsSection />
            </TabsContent>
            <TabsContent value="step-2">
              <h2 className="text-xl font-semibold my-4">Choose tests</h2>
              <ChooseTestsSection />
            </TabsContent>
            <QuestionProvider>
              <TabsContent value="step-3">
                <h2 className="text-xl font-semibold my-4">Add questions</h2>
                <QuestionBuilder />
              </TabsContent>
              <TabsContent value="step-4">
                <h2 className="text-xl font-semibold my-4">Finalize</h2>
                <AssessmentFinalize />
              </TabsContent>
            </QuestionProvider>
          </Tabs>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep + 1 === 1}
            >
              Back
            </Button>
            <Button onClick={currentStep + 1 === 4 ? handleFinalize : nextStep}>
              {currentStep + 1 === 4 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
