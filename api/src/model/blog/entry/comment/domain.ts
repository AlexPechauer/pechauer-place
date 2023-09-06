import * as Joi from 'joi'

export interface Value {
  id: string
  blogEntryId: string
  userId: string
  message: string
  createdBy: string
  createdAt: Date
  updatedBy: string
  updatedAt: Date
}

export const schema = Joi.object<Value>({
  id: Joi.string().max(33),
  blogEntryId: Joi.string().required(),
  userId: Joi.string().max(33),
  message: Joi.string().max(280).required(),
  createdBy: Joi.string(),
  createdAt: Joi.date(),
  updatedBy: Joi.string(),
  updatedAt: Joi.date()
})