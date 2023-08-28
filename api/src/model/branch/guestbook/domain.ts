import * as Joi from 'joi'

export interface Value {
  id: string
  branchId: string
  firstName: string
  title: string
  message: string
  createdBy: string
  createdAt: Date
  updatedBy: string
  updatedAt: Date
}

//TODO: Make this typed
export const schema = Joi.object({
  id: Joi.string().max(33),
  branchId: Joi.string().max(33).required(),
  //TODO: Make this just name
  firstName: Joi.string().max(50).required(),
  title: Joi.string().max(50).required(),
  message: Joi.string().max(280).required(),
  createdBy: Joi.string(),
  createdAt: Joi.date(),
  updatedBy: Joi.string(),
  updatedAt: Joi.date()
})