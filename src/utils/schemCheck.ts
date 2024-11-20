import { ZodSchema } from 'zod'

export const schemaCheck = (schema: ZodSchema<unknown>, data: unknown) => {
  const schemaRes = schema.safeParse(data)
  if (schemaRes.success) {
    return {
      success: true,
      data: schemaRes.data
    }
  }
  return {
    success: false,
    issues: schemaRes.error.issues
  }
}
