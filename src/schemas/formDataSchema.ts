import z from 'zod'

export const formDataSchema = z.object({
  email: z.string().email().min(1).max(100).trim().toLowerCase(),
  password: z.string()
})

export const emailSchema = z
  .string()
  .email()
  .min(1)
  .max(100)
  .trim()
  .toLowerCase()

// Existing password schema
export const passwordSchema = z
  .string()
  .min(4, { message: 'Password must be at least 8 characters long.' })
  .max(20, { message: 'Password must be at most 100 characters long.' })
  .trim()
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter.'
  })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter.'
  })
  .refine((password) => /\d/.test(password), {
    message: 'Password must contain at least one digit.'
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'Password must contain at least one special character.'
  })

export const nameSchema = z
  .string()
  .min(1, { message: 'First name is required.' })
  .max(50, { message: 'First name must be at most 50 characters long.' })
  .trim()
  .toLowerCase()

export const phoneSchema = z
  .string()
  .min(10, { message: 'Phone number must be at least 10 digits long.' })
  .max(15, { message: 'Phone number must be at most 15 digits long.' })
  .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format.' })

export const messageSchema = z.string().min(20).max(500).trim().toLowerCase()
