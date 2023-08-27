import { Express } from 'express'
import Joi = require('joi')
import { IModel } from '../model'
import * as Auth from '../component/auth'

export class Base {
  app: Express

  authorize: Auth.Authorize

  constructor(app: Express) {
    this.app = app
    this.authorize = new Auth.Authorize()
  }

  bodyInput = () => {
    return async (req: any, res: any, next: any) => {
      req.input = { ...req.input, ...req.body }
      await next()
    }
  }

  paramsInput = () => {
    return async (req: any, res: any, next: any) => {
      req.input = { ...req.input, ...req.params }
      await next()
    }
  }

  validate = (schema: Joi.ObjectSchema<any>) => {
    return async (req: any, res: any, next: any) => {
      //TODO: Why am I appending userId here?
      // const validated = schema.append({ userId: Joi.string().max(33) }).validate(req.input)
      const validated = schema.validate(req.input)
      if (validated.error) {
        res.statusCode = 422
        const details = validated.error.details[0]
        res.json({
          ctx: `body.${details.context?.label}`,
          body: details.message
        })
        return
      }
      await next()
    }
  }

  add = <Item>(collection: IModel<Item>) => {
    return async (req: any, res: any, next: any) => {
      try {
        const id = await collection.add(req.input)
        if (!id) { throw Error('Unable to add instance') }
        req.response = await collection.findOne([{ column: 'id', value: id }])
      } catch (error) {
        console.log('error adding to database', error)
        res.json({
          ctx: `global`,
          body: 'unable to add instance'
        })
        return
      }
      await next()
    }
  }

  update = <Item>(collection: IModel<Item>, value: string) => {
    return async (req: any, res: any, next: any) => {
      const obj = { ...req.response, ...req.input }
      const criteria = [{ column: 'id', value: req.params[value] }]
      try {
        const id = await collection.update(obj, criteria)
        if (id) {
          console.log('id', id)
          req.response = await collection.findOne([{ column: 'id', value: id }])
          console.log('req.response', req.response)
        }
      } catch (error) {
        console.log('Error updating database', error)
        res.json({
          ctx: `global`,
          body: 'unable to update instance'
        })
        return
      }
      await next()
    }
  }

  getOne = <Item>(collection: IModel<Item>, value: string) => {
    return async (req: any, res: any, next: any) => {
      try {
        const criteria = [{ column: 'id', value: req.params[value] }]
        const instance = await collection.findOne(criteria)
        if (!instance) {
          res.statusCode = 404
          res.json({
            ctx: `global`,
            body: 'unable to find instance'
          })
          return
        }
        req.response = instance
      } catch (error) {
        console.log('error finding item from database', error)
        res.json({
          ctx: `global`,
          body: 'unable to find instance'
        })
        return
      }
      await next()
    }
  }

  delete = <Item>(collection: IModel<Item>, value: string) => {
    return async (req: any, res: any, next: any) => {
      const criteria = [{ column: 'id', value: req.params[value] }]
      try {
        await collection.delete(criteria)
      } catch (error) {
        console.log('error deleting from database', error)
        res.json({
          ctx: `global`,
          body: 'unable to delete instance'
        })
        return
      }
      await next()
    }
  }

  renderJson = (options?: Record<string, any>) => {
    return async (req: any, res: any, next: any) => {
      res.statusCode = options?.statusCode ?? 200
      res.json(req.response)
      await next()
    }
  }

  acceptJson = () => {
    return async (req: any, res: any, next: any) => {
      req.accepts('application/json')
      await next()
    }
  }

  fail = (res: any, statusCode: number, ctx: string, body: string) => {
    res.statusCode = statusCode ??= 500
    res.json({
      ctx: ctx ??= 'global',
      body: body ??= 'error occured'
    })
  }

}
