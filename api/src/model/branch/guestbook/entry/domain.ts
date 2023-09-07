import * as Joi from 'joi'

export interface Value {
  id: string
  guestbookId: string
  name: string
  title: string
  message: string
  createdBy: string
  createdAt: Date
  updatedBy: string
  updatedAt: Date
}

export const schema = Joi.object<Value>({
  id: Joi.string().max(33),
  guestbookId: Joi.string().max(33).required(),
  name: Joi.string().max(50).required(),
  title: Joi.string().max(50).required(),
  message: Joi.string().max(280).required(),
  createdBy: Joi.string(),
  createdAt: Joi.date(),
  updatedBy: Joi.string(),
  updatedAt: Joi.date()
})
