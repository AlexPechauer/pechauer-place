import * as Joi from 'joi'

export interface Value {
  id: string
  userId: string
  first_name?: string
  title: string
  message: string
  created_by: string
  created_at: Date
  updated_by: string
  updated_at: Date
}

export const schema = Joi.object({
  id: Joi.string().max(33),
  user_id: Joi.string().max(33),
  first_name: Joi.string().max(50).optional(),
  title: Joi.string().max(50).required(),
  message: Joi.string().max(280).required(),
  created_by: Joi.string(),
  created_at: Joi.date(),
  updated_by: Joi.string(),
  updated_at: Joi.date()
})