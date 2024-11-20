import { z } from 'zod'

export const ZSPendingQuestionSchema = z
  .object({
    videoDuration: z
      .object({
        hours: z
          .number()
          .min(0, 'Hours must be a non-negative number')
          .max(999, 'Hours must be less than 1000'),
        minutes: z
          .number()
          .min(0, 'Minutes must be a non-negative number')
          .max(59, 'Minutes must be less than 60'),
        seconds: z
          .number()
          .min(0, 'Seconds must be a non-negative number')
          .max(59, 'Seconds must be less than 60')
      })
      .optional(),
    type: z.enum([
      'video',
      'essay',
      'multiple-choice',
      'correct-answer',
      'true-false',
      'coding'
    ]),
    content: z.string().min(10).max(500),
    options: z
      .array(
        z.object({
          id: z.string(),
          value: z.string()
        })
      )
      .optional(),
    language: z.enum(['english', 'arabic']),
    score: z.number().min(0),
    code: z
      .object({
        content: z.string().optional(),
        language: z.string().optional()
      })
      .optional(),
    answers: z.array(
      z.object({
        id: z.string(),
        type: z.enum([
          'multiple-choice',
          'correct-answer',
          'true-false',
          'coding'
        ]),
        answer: z.union([z.string(), z.array(z.string()), z.boolean()])
      })
    )
  })
  .refine(
    (data) => {
      if (data.type === 'coding') {
        return (
          data.code?.content &&
          data.code.language &&
          data.code.content.length > 0
        )
      }
      return true
    },
    {
      message: 'Code questions must have a language and content',
      path: ['code']
    }
  )
  .refine(
    (data) => {
      if (data.type === 'multiple-choice' || data.type === 'correct-answer') {
        return data.options && data.options.length > 1
      }
      return true
    },
    {
      message: 'Multiple choice questions must have at least two options',
      path: ['options']
    }
  )
  .refine((data) => (data.type === 'video' ? data.content.length > 0 : true), {
    message: 'Video questions must have a content',
    path: ['content']
  })
  .refine((data) => (data.type === 'essay' ? data.content.length > 0 : true), {
    message: 'Essay questions must have a content',
    path: ['content']
  })
  .refine((data) => data.content.length >= 10 && data.content.length <= 500, {
    message: 'Content must be between 10 and 500 characters',
    path: ['content']
  })
  .refine((data) => data.language === 'english' || data.language === 'arabic', {
    message: 'Language is required',
    path: ['language']
  })
  .refine(
    (data) => {
      if (data.type === 'video') {
        return (
          data.videoDuration &&
          data.videoDuration.hours !== undefined &&
          data.videoDuration.minutes !== undefined &&
          data.videoDuration.seconds !== undefined
        )
      }
      return true
    },
    {
      message:
        'Video questions must have a duration of [hours, minutes, seconds]',
      path: ['videoDuration']
    }
  )
  .refine((data) => data.score !== undefined, {
    message: 'Each question must have a score',
    path: ['score']
  })
  .refine(
    (data) => {
      if (data.type === 'coding') {
        return data.answers.every(
          (answer) =>
            answer.type === 'coding' && typeof answer.answer === 'string'
        )
      }
      return true
    },
    {
      message:
        'Coding questions must have answers of type "coding" and answer must be a string',
      path: ['answers']
    }
  )
  .refine(
    (data) => {
      if (data.type === 'multiple-choice' || data.type === 'correct-answer') {
        return data.answers.every(
          (answer) =>
            (answer.type === 'multiple-choice' ||
              answer.type === 'correct-answer') &&
            (typeof answer.answer === 'string' ||
              Array.isArray(answer.answer)) &&
            (typeof answer.answer === 'string' || answer.answer.length === 1)
        )
      }
      return true
    },
    {
      message:
        'Multiple-choice and correct-answer questions must have answers of the correct type and at least one answer',
      path: ['answers']
    }
  )
  .refine(
    (data) => {
      if (data.type === 'true-false') {
        return data.answers.every(
          (answer) =>
            answer.type === 'true-false' &&
            (typeof answer.answer === 'boolean' ||
              typeof answer.answer === 'string') &&
            data.answers.length === 1
        )
      }
      return true
    },
    {
      message:
        'True-false questions must have exactly one answer of type boolean or string',
      path: ['answers']
    }
  )
