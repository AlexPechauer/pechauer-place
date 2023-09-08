import { Router, Express } from 'express'
import * as Model from '../../model'
import { Base } from '../base'
import * as bodyParser from 'body-parser'
import Joi = require('joi')
import { Actor, Role } from '../../model/auth/role'

export class Route extends Base {

  auth: Model.Auth.Collection

  users: Model.User.Collection

  constructor(app: Express) {
    super(app)
    this.auth = new Model.Auth.Collection()
    this.users = new Model.User.Collection()
  }

  build = (): Router => {

    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    router.put('/change',
      //TODO: This needs work
      this.authorize.can(),
      this.bodyInput(),
      this.validate(Joi.object({
        userId: Joi.string(),
        oldPassword: Joi.string().min(8).max(20).required(),
        newPassword: Joi.string().min(8).max(20).required()
        //TODO: Update role
        // ,role: Joi.array().items(Joi.string().valid(...Object.values(Role))),
      })),
      async (req: any, res: any, next: any) => {
        //TODO: Validate old password
        const id = await this.auth.update({ id: req.input.userId, password: req.input.newPassword, role: req.input.role },
          [{ column: 'userId', value: req.input.userId, }])
        res.status(201).json({ id })
      }
    )

    router.post('/create',
      this.bodyInput(),
      this.validate(Joi.object({
        username: Joi.string().max(33),
        email: Joi.string().email(),
        roles: Joi.array().items(Joi.string().valid(...Object.values(Role)).default(Role.USER)),
        password: Joi.string().min(8).max(20).required()
      })
      ),
      async (req: any, res: any, next: any) => {

        req.input.roles = req.input.roles.map((r: any) => Role[r])

        const userIdentifier = req.input.username ?? req.input.email
        if (!userIdentifier) { this.fail(res, 422, `body.username`, 'value required'); return }

        const criteria: Model.Criteria = [
          { column: 'username', value: req.input.username, combinator: Model.Combinator.OR },
          { column: 'email', value: req.input.email }
        ]
        const userResp = await this.users.findOne(criteria)
        if (!userResp) { this.fail(res, 404, `body.${req.input.username ? 'username' : 'email'} `, 'value does not exist'); return }
        const user = userResp

        const authResp = await this.auth.findOne([{ column: 'id', value: user.id }])
        if (authResp) { this.fail(res, 422, `body.${req.input.username ? 'username' : 'email'} `, 'value already exists'); return }

        const id = await this.auth.add({ userId: userResp.id, password: req.input.password, roles: req.input.roles })
        res.status(201).json({ id })
        await next()
      }
    )

    router.post('/login',
      //TODO: Handle login in without existing user. Currently it crashes
      //TODO: Make case insensitive
      this.bodyInput(),
      this.validate(Joi.object({
        username: Joi.string().max(33),
        email: Joi.string().email(),
        password: Joi.string().min(8).max(20).required()
      })),
      async (req: any, res: any, next: any) => {
        const userIdentifier = req.input.username ?? req.input.email
        if (!userIdentifier) { this.fail(res, 422, `body.user`, 'value required'); return }

        const criteria: Model.Criteria = [
          { column: 'username', value: req.input.username, combinator: Model.Combinator.OR },
          { column: 'email', value: req.input.email }
        ]
        const userResp = await this.users.findOne(criteria)
        if (!userResp) { this.fail(res, 404, `body.user`, 'value does not exist'); return }
        const user = userResp

        const roles = await this.auth.validatePassword(req.input.password, [{ column: 'userId', value: user.id }])
        if (!roles) { this.fail(res, 422, `body.password`, 'value does not exist'); return }
        const actor: Actor = { id: user.id, roles: roles }

        res.status(200).json(this.authorize.accredit(actor))
        await next()
      }
    )

    //TODO: Recover password needs to be an email sent out

    return router
  }
}