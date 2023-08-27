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
        const resp = await this.users.findOne([
          { column: 'username', value: req.input.username }
        ])
        if (resp != undefined
          || await this.users.findOne([{ column: 'email', value: req.input.email }])) {
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

    router.put('/:user',
      this.authorize.can(),
      this.bodyInput(),
      this.validate(Model.User.schema.fork(Model.modifiers, (schema) => schema.forbidden())),
      this.getOne(this.users, 'user'),
      //TODO: Make better
      async (req: any, res: any, next: any) => {
        if (req.input['email'] && req.input['email'] != req.response['email']) {
          if (await this.users.findOne([{ column: 'email', value: req.input['email'] }])) {
            res.json({
              ctx: 'body.email',
              body: 'value must be unique'
            })
            return
          }
        }

        if (req.input['username'] && req.input['username'] != req.response['username']) {
          if (await this.users.findOne([{ column: 'username', value: req.input['username'] }])) {
            res.json({
              ctx: 'body.username',
              body: 'value must be unique'
            })
            return
          }
        }

        await next()
      },
      this.update(this.users, 'user'),
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
