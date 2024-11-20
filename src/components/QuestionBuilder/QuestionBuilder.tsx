import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PlusCircle, Trash2 } from 'lucide-react'
import MonacoEditor from '../MonacoCodeEditor'
import AttachmentSection from './AttachmentSection'
import capitalize from '@/utils/strings/capitalize'
import TimePicker from '../TimePicker/TimePicker'
import { IPendingAnswer, IPendingQuestion } from '@/interfaces/global'
import QuestionTypeSection from './QuestionTypeSection'
import QuestionLanguageSection from './QuestionLanguageSection'
import useQuestion from '@/hooks/useQuestion'
import useAssessment from '@/hooks/useAssessment'
import { generateRandomId } from '@/utils/generateRandomId'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faCheckSquare,
  faCode,
  faLanguage,
  faPlusCircle,
  faTrash,
  faXmarkSquare,
  faCircle as faCircleSolid,
  faEdit
} from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { ZSPendingQuestionSchema } from './schemas'

const programmingLanguages = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'Ruby',
  'Go',
  'Swift',
  'Kotlin',
  'PHP',
  'TypeScript'
]

export default function QuestionBuilder() {
  const [builderState, setBuilderState] = useState<'building' | 'editing'>(
    'building'
  )
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  )
  const handleChangeBuilderState = (state: 'building' | 'editing') => {
    setBuilderState(state)
  }
  const { state, dispatch } = useQuestion()
  const { state: assessmentState, dispatch: assessmentDispatch } =
    useAssessment()
  const handleAssessmentDispatch = (
    actionName: string,
    newQuestion?: IPendingQuestion,
    questionId?: string
  ) => {
    assessmentDispatch({
      type: actionName,
      payload: newQuestion,
      questionId: questionId
    })
  }
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

  const handleUpdateQuestion = async (question: IPendingQuestion) => {
    // Await the completion of handleAssessmentDispatch
    await new Promise<void>((resolve) => {
      handleAssessmentDispatch('UPDATE_QUESTION', state, question.id)
      resolve()
    })

    // Set the editing question ID to null
    setEditingQuestionId(null)

    // Reset the form
    resetForm()
  }
  const checkQuestionSchema = (question: IPendingQuestion) => {
    const checkRes = ZSPendingQuestionSchema.safeParse({
      videoDuration: question.videoDuration,
      type: question.type,
      content: question.content,
      options: question.options,
      attachments: question.attachments,
      uploadedAttachments: question.successfullyUploadedAttachments,
      language: question.language,
      score: question.score,
      code: {
        content: question.code?.content,
        language: question.code?.language
      },
      answers: question.answers
    })
    return checkRes
  }
  const addQuestion = () => {
    if (!state.type || !state.content) {
      return
    }
    const checkRes = checkQuestionSchema(state)
    if (checkRes.success) {
      const {
        videoDuration,
        type,
        content,
        options,
        successfullyUploadedAttachments,
        language,
        code,
        score,
        answers
      } = state
      const newQuestionId = generateRandomId()
      const newQuestion: IPendingQuestion = {
        id: newQuestionId,
        videoDuration: videoDuration ? videoDuration : undefined,
        type: type,
        content: content,
        language: language,
        successfullyUploadedAttachments: successfullyUploadedAttachments
          ? successfullyUploadedAttachments
          : undefined,
        options:
          type === 'multiple-choice' || type === 'correct-answer'
            ? options
            : undefined,
        code:
          type === 'coding'
            ? {
                language: code && code.language ? code.language : '',
                content: code && code.content ? code.content : ''
              }
            : undefined,
        score: score ? score : 0,
        answers: answers
      }
      handleAssessmentDispatch('ADD_QUESTION', newQuestion, newQuestionId)
      resetForm()
    }
  }

  const resetForm = () => {
    state.id = generateRandomId()
    state.videoDuration = { hours: 0, minutes: 0, seconds: 0 }
    state.type = 'essay'
    state.content = ''
    state.options = []
    state.attachments = []
    state.successfullyUploadedAttachments = []
    state.language = 'english'
    state.score = 0
    state.code = {
      content: '',
      language: 'JavaScript'
    }
    state.answers = []
  }

  const removeQuestion = (questionId: string) => {
    handleAssessmentDispatch('DELETE_QUESTION', undefined, questionId)
  }

  const createNewEmptyOption = () => {
    handleQuestionDispatch(
      'ADD_OPTION',
      {
        id: generateRandomId(),
        value: ''
      },
      undefined,
      undefined,
      undefined
    )
  }

  const createNewEmptyAnswer = (answerType?: string, givenId?: string) => {
    const type = answerType || undefined
    const answerId = givenId || generateRandomId()
    handleQuestionDispatch(
      'ADD_ANSWER',
      {
        id: answerId,
        type: type,
        answer: '',
        score: 0
      },
      undefined,
      undefined,
      undefined
    )
    return answerId
  }
  const updateOption = (index: string, value: string) => {
    handleQuestionDispatch('UPDATE_OPTION', value, undefined, index, undefined)
  }

  const removeOption = (index: string) => {
    if (state.answers?.map((answer) => answer.id).includes(index)) {
      handleQuestionDispatch(
        'DELETE_ANSWER',
        undefined,
        undefined,
        undefined,
        index
      )
    }
    handleQuestionDispatch(
      'DELETE_OPTION',
      undefined,
      undefined,
      index,
      undefined
    )
  }

  const updateAnswer = (index: string, value: string) => {
    handleQuestionDispatch('UPDATE_ANSWER', value, undefined, undefined, index)
  }

  const removeAnswer = (index: string) => {
    handleQuestionDispatch(
      'DELETE_ANSWER',
      undefined,
      undefined,
      undefined,
      index
    )
  }

  return (
    <div className="min-h-screen p-6 flex flex-col justify-center  gap-4">
      <div className="flex flex-col justify-center gap-4">
        {builderState === 'building' && (
          <div className="mb-4">
            <QuestionTypeSection />
          </div>
        )}
        <div className="mb-4">
          <QuestionLanguageSection />
        </div>
        <div className="mb-4">
          <AttachmentSection />
        </div>
        <div className="mb-4">
          <Label htmlFor="question-content">Question Content</Label>
          <Textarea
            id="question-content"
            value={state.content}
            onChange={(e) => {
              handleQuestionDispatch('SET_CONTENT', e.target.value)
            }}
            className="mt-1"
            placeholder="Enter your question here"
          />
        </div>
        {(state.type === 'multiple-choice' ||
          state.type === 'correct-answer') && (
          <div className=" flex flex-col items-center">
            <div className="flex flex-row w-full justify-between items-center">
              <Label>Options</Label>
              <Button
                type="button"
                variant="outline"
                className="mt-2"
                onClick={() => {
                  createNewEmptyOption()
                }}
              >
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  className="h-4 w-4 mr-2"
                />
                Add Option
              </Button>
            </div>
            {state.options &&
              state.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center mt-2  w-full"
                >
                  <Button
                    key={option.id}
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (!option.value) return

                      if (state.type === 'correct-answer') {
                        if (
                          state.answers &&
                          state.answers.length === 1 &&
                          state.answers[0].id === option.id
                        ) {
                          handleQuestionDispatch(
                            'DELETE_ANSWER',
                            undefined,
                            undefined,
                            undefined,
                            option.id
                          )
                        } else {
                          handleQuestionDispatch('SET_ANSWERS', [])
                          createNewEmptyAnswer(state.type, option.id)
                          handleQuestionDispatch(
                            'UPDATE_ANSWER',
                            option.value,
                            undefined,
                            undefined,
                            option.id
                          )
                        }
                      } else {
                        if (
                          state.answers?.every(
                            (answer) => answer.id !== option.id
                          )
                        ) {
                          createNewEmptyAnswer(state.type, option.id)
                          handleQuestionDispatch(
                            'UPDATE_ANSWER',
                            option.value,
                            undefined,
                            undefined,
                            option.id
                          )
                        } else {
                          handleQuestionDispatch(
                            'DELETE_ANSWER',
                            undefined,
                            undefined,
                            undefined,
                            option.id
                          )
                        }
                      }
                    }}
                    className="ml-2"
                  >
                    <FontAwesomeIcon
                      icon={faCheckSquare}
                      className="h-4 w-4 "
                    />
                  </Button>
                  <Input
                    value={option.value}
                    onChange={(e) => {
                      updateOption(option.id, e.target.value)
                      updateAnswer(option.id, e.target.value)
                    }}
                    placeholder="..."
                    className="flex-grow"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(option.id)}
                    className="ml-2"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="h-4 w-4"
                    />
                  </Button>
                </div>
              ))}
          </div>
        )}
        {state.type === 'video' && (
          <div className="mb-4">
            <Label>Video duration</Label>
            <TimePicker
              duration={
                state.videoDuration || { hours: 0, minutes: 0, seconds: 0 }
              }
              setDuration={(value) => {
                handleQuestionDispatch('SET_VIDEO_DURATION', value)
              }}
            />
          </div>
        )}
        {state.type === 'coding' && (
          <div className="mb-4">
            <Label htmlFor="code-language">Programming Language</Label>
            <Select
              onValueChange={(value) => {
                handleQuestionDispatch('SET_CODE_LANGUAGE', value)
              }}
              defaultValue={state.code?.language}
            >
              <SelectTrigger id="code-language">
                <SelectValue placeholder="Select programming language" />
              </SelectTrigger>
              <SelectContent>
                {programmingLanguages.map((lang) => (
                  <SelectItem
                    key={lang}
                    value={lang}
                  >
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label
              htmlFor="code-content"
              className="mt-4 block"
            >
              Code
            </Label>
            <div className="mt-2 border rounded-md overflow-hidden">
              <MonacoEditor
                className="w-full overflow-auto"
                height="300px"
                value={state.code?.content}
                onChange={(value) => {
                  if (value) handleQuestionDispatch('SET_CODE_CONTENT', value)
                  if (!value) handleQuestionDispatch('SET_CODE_CONTENT', '')
                }}
                language={state.code?.language.toLowerCase()}
                defaultLanguage={state.code?.language.toLowerCase()}
              />
            </div>
          </div>
        )}
        <div>
          <Label htmlFor="question-score">Score</Label>
          <Input
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                e.preventDefault()
              }
            }}
            id="question-score"
            type="number"
            value={state.score}
            onChange={(e) => {
              handleQuestionDispatch('SET_SCORE', parseInt(e.target.value))
            }}
            className="mt-1"
            placeholder="Enter the score for this question"
            min="0"
          />
        </div>
        {state.type === 'coding' ? (
          <div className="flex flex-col justify-center">
            <div className="flex flex-row justify-between items-center">
              <Label className="font-semibold">Answers:</Label>
              <Button
                type="button"
                variant="outline"
                className="mt-2"
                onClick={() => createNewEmptyAnswer('coding')}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add code answer
              </Button>
            </div>
            {state.answers &&
              state.answers.map((answer) => {
                if (answer.type === 'coding') {
                  return (
                    <div
                      key={answer.id}
                      className="flex flex-row justify-center items-center"
                    >
                      <MonacoEditor
                        key={answer.id}
                        className="w-full overflow-auto"
                        height="300px"
                        value={answer.answer as string}
                        onChange={(value) => {
                          if (value)
                            handleQuestionDispatch(
                              'UPDATE_ANSWER',
                              value,
                              undefined,
                              undefined,
                              answer.id
                            )
                          if (!value)
                            handleQuestionDispatch(
                              'UPDATE_ANSWER',
                              '',
                              undefined,
                              undefined,
                              answer.id
                            )
                        }}
                        language={state.code?.language.toLowerCase()}
                        defaultLanguage={state.code?.language.toLowerCase()}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAnswer(answer.id)}
                        className="ml-2"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="h-4 w-4"
                        />
                      </Button>
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={answer.id}
                      className="flex items-center mt-2"
                    >
                      <Input
                        value={
                          typeof answer.answer === 'string' ? answer.answer : ''
                        }
                        onChange={(e) =>
                          updateAnswer(answer.id, e.target.value)
                        }
                        placeholder="..."
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAnswer(answer.id)}
                        className="ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                }
              })}
          </div>
        ) : null}
        {state.type === 'true-false' ? (
          <div>
            <RadioGroup
              onValueChange={(value) => {
                if (state.answers && state.answers.length === 0) {
                  const answerId = createNewEmptyAnswer('true-false')
                  handleQuestionDispatch(
                    'UPDATE_ANSWER',
                    value,
                    undefined,
                    undefined,
                    answerId
                  )
                }
                if (state.answers && state.answers.length > 0) {
                  handleQuestionDispatch(
                    'UPDATE_ANSWER',
                    value,
                    undefined,
                    undefined,
                    state.answers[0].id
                  )
                }
              }}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="true"
                  id="true"
                />
                <Label htmlFor="true">True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="false"
                  id="false"
                />
                <Label htmlFor="false">False</Label>
              </div>
            </RadioGroup>
          </div>
        ) : null}
        {state.answers && state.answers.length > 0 ? (
          <div
            className={`flex flex-col justify-center border-dashed border-2 rounded-md p-4 ${
              state.type === 'true-false'
                ? state.answers[0].answer === 'true'
                  ? 'bg-gradient-to-r from-green-500 to-white'
                  : 'bg-gradient-to-r from-red-500 to-white'
                : ''
            }`}
          >
            {state.answers.length > 1 ? (
              <label
                className={`font-semibold ${
                  state.type === 'true-false' ? 'text-white' : ''
                }`}
              >
                Final answers:
              </label>
            ) : (
              <label
                className={`font-semibold ${
                  state.type === 'true-false' ? 'text-white' : ''
                }`}
              >
                Final answer:
              </label>
            )}
            {state.answers &&
              state.answers.map((answer: IPendingAnswer) => {
                return (
                  <div key={answer.id}>
                    {state.type === 'true-false' && (
                      <div>
                        {state.answers &&
                          state.answers[0].answer === 'true' && (
                            <FontAwesomeIcon
                              icon={faCheckSquare}
                              className="w-8 h-8 text-white"
                            />
                          )}
                        {state.answers &&
                          state.answers[0].answer === 'false' && (
                            <FontAwesomeIcon
                              icon={faXmarkSquare}
                              className="w-8 h-8 text-white"
                            />
                          )}
                      </div>
                    )}

                    {state.type === 'coding' ? (
                      <div className="bg-gray-900 rounded-md p-4 overflow-hidden">
                        <div className="bg-gray-800 text-white p-2 rounded-t-md">
                          <span className="text-xs">Code Answer</span>
                        </div>
                        <pre className="text-[0.7rem] bg-gray-900 text-white p-2 rounded-b-md">
                          <code>{answer.answer}</code>
                        </pre>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            {state.type === 'multiple-choice' ||
            state.type === 'correct-answer' ? (
              <div>
                <div className="flex flex-row gap-2 items-center">
                  {state.answers.map((answer) => {
                    return (
                      <div
                        key={answer.id}
                        className="flex items-center bg-gray-400/50 rounded-md p-3"
                      >
                        <span>{answer.answer}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <Button
          disabled={builderState === 'editing'}
          onClick={addQuestion}
          className="bg-primary-500 hover:bg-primary-600 text-white"
        >
          Add Question
        </Button>
      </div>
      <div className="space-y-4">
        {assessmentState.questions.map((question) => (
          <div
            key={question.id}
            className={`bg-white rounded-lg shadow-md p-4 flex justify-between items-start ${
              editingQuestionId === question.id
                ? 'border-2 border-teal-500'
                : ''
            }`}
          >
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-secondary-700">
                {capitalize(question.type.replace('-', ' ')) + ' question'}:{' '}
              </span>
              <div className="flex flex-row gap-1 items-center text-[0.7rem]">
                <FontAwesomeIcon
                  icon={faLanguage}
                  className="w-3 h-3"
                />
                <div className="font-semibold">Language:</div>
                <span>{capitalize(question.language)}</span>
              </div>
              <div className="flex flex-row gap-1 items-center text-[0.7rem]">
                <FontAwesomeIcon
                  icon={faBars}
                  className="w-3 h-3"
                />
                <span className="font-semibold">Content: </span>
                <span className="text-tertiary-dark-700">
                  {question.content}
                </span>
              </div>
              {question.type === 'coding' && question.code && (
                <div>
                  <div className="flex flex-row gap-1 items-center text-[0.7rem]">
                    <FontAwesomeIcon icon={faCode} />
                    <span className="font-semibold">Programing language: </span>
                    {question.code.language}
                  </div>
                  <div className="flex flex-row gap-1 items-center text-[0.7rem]">
                    <span className="font-semibold">Code snippet:</span> {''}
                    <code>{question.code.content}</code>
                  </div>
                </div>
              )}
              {question.type === 'multiple-choice' ||
              question.type === 'correct-answer' ? (
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row gap-1 items-center text-[0.7rem]">
                    <FontAwesomeIcon icon={faCircle} />
                    <span className="font-semibold">Options: </span>
                    {question.options
                      ? question.options.map((option) => (
                          <span
                            className="bg-gray-500/20 rounded-md py-[0.2rem] px-[0.2rem]"
                            key={option.id}
                          >
                            {option.value}
                          </span>
                        ))
                      : null}
                  </div>
                  <div className="flex flex-row gap-1 items-center text-[0.7rem]">
                    <FontAwesomeIcon icon={faCircleSolid} />
                    <span className="font-semibold">Answers: </span>
                    {question.answers
                      ? question.answers.map((answer) => (
                          <span
                            className="bg-gray-500/20 rounded-md py-[0.2rem] px-[0.2rem]"
                            key={answer.id}
                          >
                            {answer.answer}
                          </span>
                        ))
                      : null}
                  </div>
                </div>
              ) : null}
              {question.type === 'video' && question.videoDuration && (
                <div>
                  <div className="flex flex-row gap-1 items-center text-[0.7rem]">
                    <span className="font-semibold">Video duration: </span>
                    {question.videoDuration.hours}h{' '}
                    {question.videoDuration.minutes}m{' '}
                    {question.videoDuration.seconds}s
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeQuestion(question.id)}
                className="text-tertiary-dark-500 hover:text-tertiary-dark-700"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="h-4 w-4"
                />
              </Button>
              {editingQuestionId === question.id ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setBuilderState('building')
                    handleUpdateQuestion(question)
                  }}
                  className="text-tertiary-dark-500 hover:text-tertiary-dark-700"
                >
                  <FontAwesomeIcon
                    icon={faCheckSquare}
                    className="h-4 w-4"
                  />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setBuilderState('editing')
                    setEditingQuestionId(question.id)
                    const foundQuestion = assessmentState.questions.find(
                      (q) => q.id === question.id
                    )
                    if (foundQuestion) {
                      const {
                        id,
                        videoDuration,
                        type,
                        content,
                        options,
                        successfullyUploadedAttachments,
                        language,
                        code,
                        score,
                        answers
                      } = foundQuestion
                      state.id = id
                      state.videoDuration = videoDuration
                      state.type = type
                      state.content = content
                      state.options = options
                      state.successfullyUploadedAttachments =
                        successfullyUploadedAttachments
                      state.language = language
                      state.code = code
                      state.score = score
                      state.answers = answers
                    }
                  }}
                  className="text-tertiary-dark-500 hover:text-tertiary-dark-700"
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="h-4 w-4"
                  />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
