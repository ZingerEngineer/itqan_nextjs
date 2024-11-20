'use client'

import { IAssessment, IPendingTest, IQuestion } from '@/interfaces/global'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faCheckSquare,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import useAssessment from '@/hooks/useAssessment'
import { useEffect, useState } from 'react'
import { getCookie } from '@/utils/getCookie'
import axios from 'axios'

export default function FinalizeTestSection() {
  const { state, dispatch } = useAssessment()
  const [fetchedQuestions, setFetchedQuestions] = useState<IQuestion[]>([])
  const [fetchedTests, setFetchedTests] = useState<IAssessment[]>([])

  const handleTestOrder = (
    action: string,
    newDetails: unknown,
    testId: string
  ) => {
    dispatch({ type: action, payload: newDetails, testId: testId })
  }

  const selectExistingQuestion = () => {}
  useEffect(() => {
    const fetchTests = async (tests: IPendingTest[]) => {
      const currentFetchedTests: IAssessment[] = []
      const url = process.env.NEXT_PUBLIC_BACK_END_BASE_URL
      const token = getCookie('Authorization')

      // Fetch all tests asynchronously
      const fetchPromises = tests.map(async (test: IPendingTest) => {
        try {
          const assessmentAxiosResponse = await axios.get(
            `${url}/api/v1/assessments/${test.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
            }
          )

          const assessment = assessmentAxiosResponse.data.data.data.assessment
          if (assessment) {
            currentFetchedTests.push(assessment)
          }
        } catch (error) {
          return
        }
      })

      await Promise.all(fetchPromises)
      return currentFetchedTests
    }

    fetchTests(state.tests)
      .then((data) => {
        setFetchedTests(data)
      })
      .catch((error) => {
        return
      })
  }, [state.tests])

  useEffect(() => {
    const currentTestQuestions: IQuestion[] = []

    fetchedTests.forEach((test: IAssessment) => {
      if (test.questions && test.questions.length > 0) {
        currentTestQuestions.push(...test.questions)
      }
    })

    setFetchedQuestions(currentTestQuestions)
  }, [fetchedTests])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Tests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {state.tests.map((test, index) => (
            <div
              key={test.id}
              className="flex flex-col items-center justify-between p-2 border rounded"
            >
              <div className="w-full flex justify-between items-center">
                <span>{test.name}</span>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      handleTestOrder('TEST_UPWARD', undefined, test.id)
                    }}
                    disabled={index === 0}
                  >
                    <FontAwesomeIcon
                      icon={faChevronUp}
                      className="h-4 w-4"
                    />
                    <span className="sr-only">Move test up</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      handleTestOrder('TEST_DOWNWARD', undefined, test.id)
                    }}
                    disabled={index === state.tests.length - 1}
                  >
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="h-4 w-4"
                    />
                    <span className="sr-only">Move test down</span>
                  </Button>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-col justify-center gap-2">
                  {fetchedQuestions.map((question) => {
                    if (question.assessment_id.includes(test.id)) {
                      return (
                        <div
                          key={question.id}
                          className="flex flex-row items-center justify-between mt-2"
                        >
                          <div
                            className="flex-grow text-[0.75rem] p-2 border border-gray-400 rounded-md"
                            key={question.id}
                          >
                            {question.text}
                          </div>
                          <Button
                            variant="ghost"
                            className="p-2"
                          >
                            <FontAwesomeIcon
                              className="w-3 h-3"
                              icon={faCheckSquare}
                              onClick={selectExistingQuestion}
                            />
                          </Button>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
