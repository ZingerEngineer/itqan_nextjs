import {
  IDuration,
  IPendingAnswer,
  IPendingAttachment,
  IPendingQuestion,
  IPendingQuestionOption,
  IPendingUploadedAttachment
} from '@/interfaces/global'
import cloneDeep from 'lodash.clonedeep'
export interface IPendingQuestionAction {
  attachmentId?: string
  optionId?: string
  answerId?: string
  type: string
  payload: unknown
}
// Define reducer
export const questionReducer = (
  state: IPendingQuestion,
  action: IPendingQuestionAction
) => {
  switch (action.type) {
    case 'SET_TYPE': {
      const newState = cloneDeep(state)
      const questionType = action.payload as string
      if (questionType) {
        newState.type = questionType
      }
      return newState
    }
    case 'SET_LANGUAGE': {
      const newState = cloneDeep(state)
      const questionLanguage = action.payload as string
      if (questionLanguage) {
        newState.language = questionLanguage
      }
      return newState
    }

    case 'SET_OPTIONS': {
      const newState = cloneDeep(state)
      const options = action.payload as IPendingQuestionOption[]
      if (options) {
        newState.options = options
      }
      return newState
    }
    case 'ADD_OPTION': {
      const newState = cloneDeep(state)
      const newOption = action.payload as IPendingQuestionOption
      if (newOption) {
        newState.options?.push(newOption)
      }
      return newState
    }
    case 'UPDATE_OPTION': {
      const newState = cloneDeep(state)
      const optionId = action.optionId as string
      if (optionId) {
        const option = newState.options?.find(
          (option) => option.id === optionId
        )
        if (option) {
          option.value = action.payload as string
        }
      }
      return newState
    }
    case 'DELETE_OPTION': {
      const newState = cloneDeep(state)
      const optionId = action.optionId as string
      if (optionId) {
        newState.options = newState.options?.filter(
          (option) =>
            option.id.toLowerCase().trim() !== optionId.toLowerCase().trim()
        )
      }
      return newState
    }
    case 'SET_CONTENT': {
      const newState = cloneDeep(state)
      const content = action.payload as string
      if (content) {
        newState.content = content
      }
      return newState
    }
    case 'ADD_ANSWER': {
      const newState = cloneDeep(state)
      const answer = action.payload as IPendingAnswer
      if (answer) {
        newState.answers?.push(answer)
      }
      return newState
    }
    case 'SET_ANSWERS': {
      const newState = cloneDeep(state)
      const answers = action.payload as IPendingAnswer[]
      if (answers) {
        newState.answers = answers
      }
      return newState
    }
    case 'UPDATE_ANSWER': {
      const newState = cloneDeep(state)
      const answerId = action.answerId as string
      if (answerId) {
        const answer = newState.answers?.find(
          (answer) => answer.id === answerId
        )
        if (answer) {
          answer.answer = action.payload as string
        }
      }
      return newState
    }
    case 'DELETE_ANSWER': {
      const newState = cloneDeep(state)
      const answerId = action.answerId as string
      if (answerId) {
        newState.answers = newState.answers?.filter(
          (answer) => answer.id !== answerId
        )
      }
      return newState
    }
    case 'SET_SCORE': {
      const newState = cloneDeep(state)
      const score = action.payload as number
      if (score) {
        newState.score = score
      }
      return newState
    }
    case 'SET_VIDEO_DURATION': {
      const newState = cloneDeep(state)
      const videoDuration = action.payload as IDuration
      if (videoDuration) {
        newState.videoDuration = videoDuration
      }
      return newState
    }
    case 'ADD_ATTACHMENT': {
      const newState = cloneDeep(state)
      const attachment = action.payload as IPendingAttachment
      if (attachment) {
        newState.attachments = [...(newState.attachments || []), attachment]
      }
      return newState
    }
    case 'DELETE_ATTACHMENT': {
      const newState = cloneDeep(state)
      const attachmentId = action.attachmentId
      if (attachmentId) {
        newState.attachments = newState.attachments?.filter(
          (attachment) => attachment.id !== attachmentId
        )
      }
      return newState
    }
    case 'CLEAR_ATTACHMENTS': {
      const newState = cloneDeep(state)
      newState.attachments = []
      return newState
    }
    case 'SET_CODE_LANGUAGE': {
      const newState = cloneDeep(state)
      const codeLanguage = action.payload as string
      if (codeLanguage) {
        if (newState.code) {
          newState.code.language = codeLanguage
        }
      }
      return newState
    }
    case 'SET_CODE_CONTENT': {
      const newState = cloneDeep(state)
      const codeContent = action.payload as string
      if (codeContent) {
        if (newState.code) {
          newState.code.content = codeContent
        }
      }
      return newState
    }
    case 'ADD_SUCCESSFULLY_UPLOADED_ATTACHMENT': {
      const newState = cloneDeep(state)
      const attachment = action.payload as IPendingUploadedAttachment
      if (attachment) {
        newState.successfullyUploadedAttachments?.push(attachment)
      }
      return newState
    }
    case 'REMOVE_SUCCESSFULLY_UPLOADED_ATTACHMENT': {
      const newState = cloneDeep(state)
      const attachmentId = action.attachmentId as string
      if (attachmentId) {
        newState.successfullyUploadedAttachments =
          newState.successfullyUploadedAttachments?.filter(
            (attachment) => attachment.id !== attachmentId
          )
      }
      return newState
    }

    default:
      return state
  }
}
