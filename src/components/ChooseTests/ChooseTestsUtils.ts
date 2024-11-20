import { IAssessment } from '@/interfaces/global'

export const getAssessmentTypes = (assessment: IAssessment) => {
  const types: string[] = []
  assessment.questions.map((question) => types.push(question.type))
  return types
}
