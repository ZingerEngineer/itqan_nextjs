import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { IAssessment, IPendingTest, IQuestion } from '@/interfaces/global'
import useAssessment from '@/hooks/useAssessment'
import { getCookie } from '@/utils/getCookie'
import axios from 'axios'
import capitalize from '@/utils/strings/capitalize'
import { Badge } from '../ui/badge'

export default function TestFianlizeCard() {
  const { state, dispatch } = useAssessment()
  const [fetchedTests, setFetchedTests] = useState<IAssessment[]>([])

  const handleTestOrder = (
    action: string,
    newDetails: unknown,
    testId: string
  ) => {
    dispatch({ type: action, payload: newDetails, testId: testId })
  }

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

  const [expandedTests, setExpandedTests] = useState<Record<string, boolean>>(
    {}
  )
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>(
    state.existingQuestions || []
  )

  if (fetchedTests.length === 0) {
    return <div className="text-center p-4">No tests available.</div>
  }

  const toggleTest = (testId: string) => {
    setExpandedTests((prev) => ({ ...prev, [testId]: !prev[testId] }))
  }

  const toggleQuestion = (questionId: string) => {
    if (selectedQuestions.includes(questionId)) {
      setSelectedQuestions((prev) =>
        prev.filter((question) => question !== questionId)
      )
      handleTestOrder('DELETE_EXISTING_QUESTION', questionId, '')
    } else {
      setSelectedQuestions((prev) => [...prev, questionId])
      handleTestOrder('ADD_EXISTING_QUESTION', questionId, '')
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Tests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fetchedTests.map((test) => (
            <Card
              key={test._id}
              className="w-full"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  {capitalize(test.title)}
                </CardTitle>
                <div className="flex flex-row items-center gap-2">
                  <CardDescription>
                    <Badge>
                      {
                        test.questions.filter((question: IQuestion) =>
                          state.existingQuestions.includes(question.id)
                        ).length
                      }
                    </Badge>
                  </CardDescription>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTest(test._id)}
                    aria-label={
                      expandedTests[test._id] ? 'Collapse test' : 'Expand test'
                    }
                  >
                    {expandedTests[test._id] ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {expandedTests[test._id] && (
                <CardContent>
                  <ul className="space-y-2">
                    {test.questions.map((question) => (
                      <li
                        key={question.id}
                        className="flex items-center space-x-2"
                      >
                        <div className="flex flex-row items-center gap-3 border border-gray-500 rounded-md p-2 flex-grow">
                          <Checkbox
                            id={question.id}
                            checked={state.existingQuestions.includes(
                              question.id
                            )}
                            onCheckedChange={() => toggleQuestion(question.id)}
                          />
                          <div className="flex gap-2 justify-between flex-grow p-2 items-center">
                            <label
                              htmlFor={question.id}
                              className="text-[0.8rem] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {question.text}
                            </label>
                            <Badge>{question.type}</Badge>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
