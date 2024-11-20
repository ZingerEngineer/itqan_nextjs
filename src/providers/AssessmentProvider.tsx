// AssessmentContext.js
import React, { createContext, useReducer } from 'react'
import { IPendingAssessment } from '@/interfaces/global'
import {
  assessmentReducer,
  IPendingAssessmentAction
} from '@/reducers/assessmentReducer'

const generateRandomId = () => {
  return Math.random().toString(36)
}

// Define initial state
const initialState: IPendingAssessment = {
  id: generateRandomId(),
  type: [],
  questions: [],
  existingQuestions: [],
  attachments: [],
  testsQuestions: [],
  tests: [],
  language: 'english',
  name: 'Untitled Assessment',
  jobRole: '',
  description: '',
  createdBy: {
    creatorId: '',
    creatorName: ''
  },
  duration: {
    hours: 0,
    minutes: 0,
    seconds: 0
  }
}

export const AssessmentContext = createContext<{
  state: IPendingAssessment
  dispatch: React.Dispatch<IPendingAssessmentAction>
}>({
  state: initialState,
  dispatch: () => null
})

export const AssessmentProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState)

  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  )
}
