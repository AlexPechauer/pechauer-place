import * as Joi from 'joi'

export interface Value {
  id: string,
  blogId: string,
  userId: string,
  createdBy: string
  createdAt: Date
  updatedBy: string
  updatedAt: Date
}

export const schema = Joi.object<Value>({
  id: Joi.string().max(33),
  userId: Joi.string().max(33),
  blogId: Joi.string().max(33),
  createdBy: Joi.string(),
  createdAt: Joi.date(),
  updatedBy: Joi.string(),
  updatedAt: Joi.date()
})