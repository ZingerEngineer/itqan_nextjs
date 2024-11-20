export interface IAssessment {
  _id: string
  type: string[]
  state: string
  totalScore: number
  questions: IQuestion[]
  language: string
  title: string
  jobRole: string
  description: string
  candidateLevel: string
  createdAt: string
  duration: {
    hours: number
    minutes: number
    seconds: number
  }
  user_id: string
  user_name: string
  user_email: string
}

export interface IFetchedAssessment {
  assessment: IAssessment
}

export interface IExistingQuestion {
  testId: string
  correctAnswer: string
  createdAt: string
  id: string
  options: string[]
  requiresFileUpload: boolean
  score: number
  skill: string
  text: string
  type: string
  __v: number
  _id: string
}

export interface IPendingAssessment {
  id: string
  //First step data
  name: string
  language: string
  jobRole: string
  type: string[]
  attachments: string[]
  description: string
  duration: IDuration
  //Second step data
  tests: IPendingTest[] //Chosen test ids
  //Third step data
  questions: IPendingQuestion[]
  existingQuestions: string[]
  createdBy: {
    creatorId: string
    creatorName: string
  }
  //Fourth step data
  testsQuestions: IQuestion[]
}

export interface IFinalizedNewQuestion {
  text: string
  type: string
  skill: string
  correctAnswer: (number | string | string[] | boolean)[]
}

export interface IFinalizedAssessment {
  title: string
  description: string
  jobRole: string
  newQuestions: IFinalizedNewQuestion[]
  existingQuestions: string[]
  duration: number
}

export interface IPendingTest {
  id: string
  name: string
}
export interface IStep {
  title: string
  status: 'completed' | 'current' | 'upcoming'
}

export interface ITime {
  hours: number
  minutes: number
  seconds: number
  period?: 'AM' | 'PM'
}

export interface ITestsFilters {
  name: string
  options: string[]
  isSelected: null | string
}
export interface ITest {
  type: string[]
  _id: string
  state: string
  totalScore: number
  questions: IQuestion[]
  language: string
  name: string
  jobRole: string
  attachments: IPendingAttachment[]
  description: string
  candidateLevel: string
  createdAt: string
  createdBy: {
    creatorId: string
    creatorName: string
  }
  duration: IDuration
}
export interface IDuration {
  hours: number
  minutes: number
  seconds: number
}

export type TQuestionType =
  | 'video'
  | 'essay'
  | 'multiple-choice'
  | 'correct-answer'
  | 'true-false'
  | 'coding'

export interface IAnswer {
  questionId: string
  answer: string | string[] | boolean
  score: number
}
export interface IQuestion {
  assessment_id: string
  id: string
  videoDuration?: IDuration
  type: TQuestionType
  text: string
  options?: string[]
  attachments?: string[]
  score: number
  code?: {
    language: string
    content: string
  }
  language: string
  answer?: IAnswer
}
export interface IPendingQuestionOption {
  id: string
  value: string
}

export interface IPendingAttachment {
  id: string
  file: File
  name: string
  url: string
}
export interface IPendingQuestion {
  id: string
  videoDuration?: IDuration
  type: string
  content: string
  options?: IPendingQuestionOption[]
  attachments?: IPendingAttachment[]
  successfullyUploadedAttachments?: IPendingUploadedAttachment[]
  score: number
  code?: {
    language: string
    content: string
  }
  language: string
  answers?: IPendingAnswer[]
}
export interface IPendingUploadedAttachment {
  id: string
  url: string
  name: string
  size: number
  type: string
}

export interface IPendingAnswer {
  id: string
  type: string
  answer: string | string[] | boolean
}

export interface ISuperAdmin {
  _id: string
  hrs: string[]
  isVerified: boolean
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IHR {
  _id: string
  candidates: string[]
  assessments: string[]
  firstName: string
  lastName: string
  businessEmail: string
  role: string
  phone: string
  companySize: string
  createdAt: string
  updatedAt: string
  __v: number
}

// export interface IHR {}
