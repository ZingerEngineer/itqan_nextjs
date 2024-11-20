import {
  IDuration,
  IPendingAssessment,
  IPendingQuestion,
  IPendingTest,
  IQuestion
} from '@/interfaces/global'
import cloneDeep from 'lodash.clonedeep'
export interface IPendingAssessmentAction {
  testsOrder?: string[] //Tests ids
  questionsOrder?: string[] //Questions ids
  questionId?: string
  testId?: string
  type: string
  payload: unknown
}
// Define reducer
export const assessmentReducer = (
  state: IPendingAssessment,
  action: IPendingAssessmentAction
) => {
  switch (action.type) {
    case 'SET_NAME': {
      const newState = cloneDeep(state)
      const testName = action.payload as string
      if (testName !== undefined) {
        newState.name = testName
      }
      return newState
    }
    case 'SET_JOB_ROLE': {
      const newState = cloneDeep(state)
      const newJobRole = action.payload as string
      if (newJobRole !== undefined) {
        newState.jobRole = newJobRole
      }
      return newState
    }
    case 'SET_LANGUAGE': {
      const newState = cloneDeep(state)
      const newLanguage = action.payload as string
      if (newLanguage !== undefined) {
        newState.language = newLanguage
      }
      return newState
    }
    case 'SET_DESCRIPTION': {
      const newState = cloneDeep(state)
      const newDescription = action.payload as string
      if (newDescription !== undefined) {
        newState.description = newDescription
      }
      return newState
    }
    case 'SET_DURATION': {
      const newState = cloneDeep(state)
      const newDuration = action.payload as IDuration
      if (newDuration !== undefined) {
        newState.duration = newDuration
      }
      return newState
    }

    case 'ADD_TEST': {
      const newState = cloneDeep(state)
      const newTest = action.payload as IPendingTest
      if (newTest) {
        newState.tests.push(newTest)
      }

      return newState
    }
    case 'ADD_QUESTION': {
      const newState = cloneDeep(state)
      const newQuestion = action.payload as IPendingQuestion
      if (newQuestion) {
        newState.questions.push(newQuestion)
      }

      return newState
    }

    case 'ADD_EXISTING_QUESTION': {
      const newState = cloneDeep(state)
      const newExistingQuestionId = action.payload as string
      if (newExistingQuestionId) {
        newState.existingQuestions.push(newExistingQuestionId)
      }
      return newState
    }
    case 'DELETE_TEST': {
      const newState = cloneDeep(state)
      const testId = action.testId
      if (testId) {
        newState.tests = newState.tests.filter((test) => test.id !== testId)
      }

      return newState
    }
    case 'UPDATE_QUESTION': {
      const newState = cloneDeep(state)
      const questionId = action.questionId
      if (questionId) {
        const toBeUpdatedQuestion = newState.questions.find(
          (question) => question.id === questionId
        )
        if (toBeUpdatedQuestion) {
          Object.assign(toBeUpdatedQuestion, action.payload)
        }
      }
      return newState
    }
    case 'DELETE_QUESTION': {
      const newState = cloneDeep(state)
      if (action.questionId) {
        newState.questions = newState.questions.filter(
          (question) => question.id !== action.questionId
        )
      }
      return newState
    }
    case 'DELETE_EXISTING_QUESTION': {
      const newState = cloneDeep(state)
      const questionId = action.payload as string
      if (questionId) {
        const filteredIds = newState.existingQuestions.filter(
          (id) => id !== action.payload
        )
        newState.existingQuestions = filteredIds
      }
      return newState
    }
    case 'TEST_UPWARD': {
      const newState = cloneDeep(state)
      const testId = action.testId
      if (testId) {
        newState.tests.filter((test) => {
          if (test.id === testId) {
            const index = newState.tests.indexOf(test)
            if (index > 0) {
              const temp = newState.tests[index]
              newState.tests[index] = newState.tests[index - 1]
              newState.tests[index - 1] = temp
            }
          }
        })
      }
      return newState
    }
    case 'TEST_DOWNWARD': {
      const newState = cloneDeep(state)
      const testId = action.testId
      if (testId) {
        newState.tests.filter((test) => {
          if (test.id === testId) {
            const index = newState.tests.indexOf(test)
            if (index < newState.tests.length - 1) {
              const temp = newState.tests[index]
              newState.tests[index] = newState.tests[index + 1]
              newState.tests[index + 1] = temp
            }
          }
        })
      }

      return newState
    }

    case 'QUESTION_UPWARD': {
      const newState = cloneDeep(state)
      const questionId = action.questionId
      if (questionId) {
        newState.questions.filter((question) => {
          if (question.id === questionId) {
            const index = newState.questions.indexOf(question)
            if (index > 0) {
              const temp = newState.questions[index]
              newState.questions[index] = newState.questions[index - 1]
              newState.questions[index - 1] = temp
            }
          }
        })
      }
      return newState
    }
    case 'QUESTION_DOWNWARD': {
      const newState = cloneDeep(state)
      const questionId = action.questionId
      if (questionId) {
        newState.questions.filter((question) => {
          if (question.id === questionId) {
            const index = newState.questions.indexOf(question)
            if (index < newState.questions.length - 1) {
              const temp = newState.questions[index]
              newState.questions[index] = newState.questions[index + 1]
              newState.questions[index + 1] = temp
            }
          }
        })
      }
      return newState
    }
    default:
      return state
  }
}
