import * as Joi from 'joi'
import * as Blog from './type'

export interface Value {
  id: string
  userId: string
  blogTypeId: Blog.Type
  createdBy: string
  createdAt: Date
  updatedBy: string
  updatedAt: Date
}

export const schema = Joi.object<Value>({
  id: Joi.string().max(33),
  userId: Joi.string().max(33).required(),
  blogTypeId: Joi.string().valid(...Object.values(Blog.Type)).required(),
  createdBy: Joi.string(),
  createdAt: Joi.date(),
  updatedBy: Joi.string(),
  updatedAt: Joi.date()
})