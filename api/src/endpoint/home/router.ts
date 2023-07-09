import { Router, Express } from 'express'
import * as Model from '../../model'
import { Base } from '../base'
import * as cors from 'cors'

export class Route extends Base {

  users: Model.User.Collection

  constructor(app: Express) {
    super(app);

    this.users = new Model.User.Collection()
  }

  build = (): Router => {

    const router = Router()

    router.get('/',
      cors(),
      async (req: any, res: any, next: any) => {
        console.log('req.get(origin)', req.get('origin'))
        req.accepts('application/json')
        res.json('Hello alex')
        await next()
      })

    return router
  }
}