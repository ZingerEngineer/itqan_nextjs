import z from 'zod'
export const ZSSuperAdmin = z.object({
  _id: z.string(),
  hrs: z.array(z.string()),
  isVerified: z.boolean(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['super-admin', 'admin']),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number()
})

export const ZSHR = z.object({
  _id: z.string(),
  candidates: z.array(z.string()),
  assessments: z.array(z.string()),
  businessEmail: z.string().email(),
  role: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number()
})
