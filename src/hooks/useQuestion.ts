import { useContext } from 'react'
import { QuestionContext } from '@/providers/QuestionProvider'

const useQuestion = () => {
  const context = useContext(QuestionContext)
  if (!context) {
    throw new Error('useQuestion must be used within an AssessmentProvider')
  }
  return context
}

export default useQuestion
