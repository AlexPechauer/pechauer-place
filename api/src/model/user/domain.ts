import * as Joi from 'joi'

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface Address {
  street: string
  city: string
  zipCode: number
  country: string
}

export interface Value {
  id: string
  username: string
  firstName: string
  lastName: string
  status: string
  address: Address
  email: string
  createdBy: string
  createdAt: Date
  updatedBy: string
  updatedAt: Date
}

export const schema = Joi.object<Value>({
  id: Joi.string().max(33),
  username: Joi.string().max(50).required(),
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50),
  status: Joi.string().valid(...Object.values(Status)).default(Status.ACTIVE),
  address: Joi.object({
    street: Joi.string().max(50),
    city: Joi.string().max(50),
    zipCode: Joi.number(),
    country: Joi.string().max(50),
  }),
  email: Joi.string().email(),
  createdBy: Joi.string(),
  createdAt: Joi.date(),
  updatedBy: Joi.string(),
  updatedAt: Joi.date()
})

