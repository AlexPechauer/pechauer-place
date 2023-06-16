import * as Joi from 'joi'
import { Role } from './role/domain'

export interface Value {
  id: string
  userId: string
  salt: string
  hash: string
  role: Role[]
}

export const schema = Joi.object({
  id: Joi.string().max(33),
  userId: Joi.string().max(33).required(),
  salt: Joi.string().max(33).required(),
  hash: Joi.string().max(128).required(),
  role: Joi.string().valid(...Object.values(Role)).default(4)
})