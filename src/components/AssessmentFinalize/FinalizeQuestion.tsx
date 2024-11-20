import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronUp,
  faEdit
} from '@fortawesome/free-solid-svg-icons'
import capitalize from '@/utils/strings/capitalize'
import useAssessment from '@/hooks/useAssessment'
import { useAssessmentWizard } from '@/providers/AssessmentWizardProvider'

export default function FinalizeQuestionSection() {
  const { state, dispatch } = useAssessment()
  const { prevStep } = useAssessmentWizard()
  const handleEditQuestionClick = () => {
    prevStep()
  }
  const handleQuestionOrder = (
    action: string,
    newDetails: unknown,
    questionId: string
  ) => {
    dispatch({ type: action, payload: newDetails, questionId: questionId })
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Questions</CardTitle>
        <Button onClick={handleEditQuestionClick}>
          <FontAwesomeIcon
            icon={faEdit}
            className="mr-2"
          />
          Edit Questions
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {state.questions.map((question, index) => (
            <div
              key={question.id}
              className="space-y-2 p-4 border rounded"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{`${capitalize(
                  question.type
                )} question`}</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      handleQuestionOrder(
                        'QUESTION_UPWARD',
                        undefined,
                        question.id
                      )
                    }}
                    disabled={index === 0}
                  >
                    <FontAwesomeIcon
                      icon={faChevronUp}
                      className="h-4 w-4"
                    />
                    <span className="sr-only">Move question up</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      handleQuestionOrder(
                        'QUESTION_DOWNWARD',
                        undefined,
                        question.id
                      )
                    }}
                    disabled={index === state.questions.length - 1}
                  >
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="h-4 w-4"
                    />
                    <span className="sr-only">Move question down</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
