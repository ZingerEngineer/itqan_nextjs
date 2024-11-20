import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select'
import useQuestion from '@/hooks/useQuestion'

export default function QuestionLanguageSection() {
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

  return (
    <div>
      <Label htmlFor="question-language">Question Language</Label>
      <Select
        value={state.language}
        onValueChange={(value) => handleQuestionDispatch('SET_LANGUAGE', value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Language</SelectLabel>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="arabic">Arabic</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
