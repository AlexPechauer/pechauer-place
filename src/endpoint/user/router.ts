import { Router, Express } from 'express'
import * as Model from '../../model'
import { Base } from '../base'
import * as bodyParser from 'body-parser'

export class Route extends Base {

  users: Model.User.Collection

  constructor(app: Express) {
    super(app)

    this.users = new Model.User.Collection()
  }

  build = (): Router => {

    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    //TODO: Get all pagination

    router.post('/',
      this.bodyInput(),
      this.validate(Model.User.schema),
      async (req: any, res: any, next: any) => {
        const resp = await this.users.findOne(req.input.username)
        if (resp != undefined
          || await this.users.findOne(req.input.email) != undefined) {
          res.json({
            ctx: resp ? `body.username` : `body.email`,
            body: 'value must be unique'
          })
          return
        }
        next()
      },
      this.add(this.users),
      this.renderJson({ statusCode: 201 })
    )

    router.get('/:user',
      this.paramsInput(),
      this.getOne(this.users, 'user'),
      this.renderJson()
    )

    router.put('/',
      this.authorize.can(),
      this.bodyInput(),
      this.validate(Model.User.schema.fork(Model.modifiers, (schema) => schema.forbidden())),
      this.getOne(this.users, 'userId'),
      async (req: any, res: any, next: any) => {
        ['email', 'username'].forEach(async (value) => {
          if (req.input[value] && req.input[value] != req.response[value]) {
            const valueResponse = await this.users.findOne(req.input[value])
            if (valueResponse) {
              res.json({
                ctx: `body.${value}`,
                body: 'value must be unique'
              })
              return
            }
          }
        })
        await next()
      },
      this.update(this.users),
      this.renderJson({ statusCode: 200 })
    )

    router.delete('/:user',
      this.paramsInput(),
      this.getOne(this.users, 'user'),
      this.delete(this.users, 'user'),
      this.renderJson()
    )

    return router
  }
}
