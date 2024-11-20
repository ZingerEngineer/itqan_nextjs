'use client'
import {
  faVideo,
  faNewspaper,
  faCheckDouble,
  faBullseye,
  faCircleHalfStroke,
  faCode
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import useQuestion from '@/hooks/useQuestion'

export default function QuestionTypeSection() {
  const { state, dispatch } = useQuestion()
  const handleQuestionDispatch = (
    type: string,
    payload: unknown,
    attachmentId?: string,
    optionId?: string,
    answerId?: string
  ) => {
    dispatch({
      type: type,
      payload: payload,
      attachmentId: attachmentId,
      optionId: optionId,
      answerId: answerId
    })
  }
  const handleQuestionTypeChange = (newQuestionType: string) => {
    //Reset the question options & answers if the question type changes to essay | video.
    if (
      newQuestionType === 'video' ||
      newQuestionType === 'essay' ||
      newQuestionType === 'coding'
    ) {
      handleQuestionDispatch('SET_OPTIONS', [])
      handleQuestionDispatch('SET_ANSWERS', [])
    }
    handleQuestionDispatch('SET_TYPE', newQuestionType)
  }
  return (
    <div>
      <Label htmlFor="question-type">Question Type</Label>
      <Select
        value={state.type}
        onValueChange={(value) => {
          handleQuestionTypeChange(value)
        }}
      >
        <SelectTrigger
          id="question-type"
          value={state.type}
        >
          <SelectValue placeholder="Select question type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            className="flex items-center justify-start"
            value="video"
          >
            <FontAwesomeIcon
              icon={faVideo}
              className="w-4 h-4 mr-2"
            />{' '}
            Video
          </SelectItem>
          <SelectItem
            className="flex items-center justify-start"
            value="essay"
          >
            {' '}
            <FontAwesomeIcon
              icon={faNewspaper}
              className="w-4 h-4 mr-2"
            />{' '}
            Essay
          </SelectItem>
          <SelectItem
            className="flex items-center justify-start"
            value="multiple-choice"
          >
            <FontAwesomeIcon
              icon={faCheckDouble}
              className="w-4 h-4 mr-2"
            />{' '}
            Multiple Choice
          </SelectItem>
          <SelectItem
            className="flex items-center justify-start"
            value="correct-answer"
          >
            <FontAwesomeIcon
              icon={faBullseye}
              className="w-4 h-4 mr-2"
            />{' '}
            Choose the Correct Answer
          </SelectItem>
          <SelectItem
            className="flex items-center justify-start"
            value="true-false"
          >
            <FontAwesomeIcon
              icon={faCircleHalfStroke}
              className="w-4 h-4 mr-2"
            />{' '}
            True or False
          </SelectItem>
          <SelectItem
            className="flex items-center justify-start"
            value="coding"
          >
            <FontAwesomeIcon
              icon={faCode}
              className="w-4 h-4 mr-2"
            />{' '}
            Code
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
