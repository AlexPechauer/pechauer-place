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
  first_name: string
  last_name: string
  status: string
  address: Address
  email: string
  created_by: string
  created_at: Date
  updated_by: string
  updated_at: Date
}

export const schema = Joi.object({
  id: Joi.string().max(33),
  username: Joi.string().max(50).required(),
  first_name: Joi.string().max(50).required(),
  last_name: Joi.string().max(50),
  status: Joi.string().valid(...Object.values(Status)).default(Status.ACTIVE),
  address: Joi.object({
    street: Joi.string().max(50),
    city: Joi.string().max(50),
    zipCode: Joi.number(),
    country: Joi.string().max(50),
  }),
  email: Joi.string().email(),
  created_by: Joi.string(),
  created_at: Joi.date(),
  updated_by: Joi.string(),
  updated_at: Joi.date()
})

