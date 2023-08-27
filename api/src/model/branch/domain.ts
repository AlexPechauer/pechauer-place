import * as Joi from 'joi'

export interface Value {
  id: string,
  profile: Record<string, any>
}

export const schema = Joi.object<Value>({
  id: Joi.string().max(33),
  profile: Joi.object().required()
})