// AssessmentContext.js
import React, { createContext, useReducer } from 'react'
import { IPendingQuestion } from '@/interfaces/global'
import {
  questionReducer,
  IPendingQuestionAction
} from '@/reducers/questionReducer'

const generateRandomId = () => {
  return Math.random().toString(36)
}

// Define initial state
const initialState: IPendingQuestion = {
  id: generateRandomId(),
  videoDuration: { hours: 0, minutes: 0, seconds: 0 },
  type: 'essay',
  content: '',
  options: [],
  attachments: [],
  successfullyUploadedAttachments: [],
  score: 0,
  code: {
    language: 'JavaScript',
    content: ''
  },
  language: 'english',
  answers: []
}

export const QuestionContext = createContext<{
  state: IPendingQuestion
  dispatch: React.Dispatch<IPendingQuestionAction>
}>({
  state: initialState,
  dispatch: () => null
})

export const QuestionProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(questionReducer, initialState)

  return (
    <QuestionContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionContext.Provider>
  )
}
