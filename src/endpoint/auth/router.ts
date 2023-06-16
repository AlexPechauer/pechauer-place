import { Router, Express } from 'express'
import * as Model from '../../model'
import { Base } from '../base'
import * as bodyParser from 'body-parser'
import Joi = require('joi')
import { Role } from '../../model/auth/role'

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
        oldPassword: Joi.string().min(8).max(20).required(),
        newPassword: Joi.string().min(8).max(20).required()
        //TODO: Update role
        // ,role: Joi.array().items(Joi.string().valid(...Object.values(Role))),
      })),
      async (req: any, res: any, next: any) => {
        //TODO: Validate old password
        const id = await this.auth.update({ id: req.input.userId, password: req.input.newPassword, role: req.input.role })
        res.status(201).json({ id })
      }
    )

    router.post('/create',
      this.bodyInput(),
      this.validate(Joi.object({
        username: Joi.string().max(33),
        email: Joi.string().email(),
        role: Joi.array().items(Joi.string().valid(...Object.values(Role)).default(Role.USER)),
        password: Joi.string().min(8).max(20).required()
      })
      ),
      async (req: any, res: any, next: any) => {
        await next()
        req.input.role = req.input.role.map((r: any) => Role[r])

        const userIdentifier = req.input.username ?? req.input.email
        if (!userIdentifier) { this.fail(res, 422, `body.username`, 'value required'); return }

        const userResp = await this.users.findOne(userIdentifier)
        if (!userResp) { this.fail(res, 404, `body.${req.input.username ? 'username' : 'email'} `, 'value does not exist'); return }
        const user = userResp

        const authResp = await this.auth.findOne(user.id)
        if (authResp) { this.fail(res, 422, `body.${req.input.username ? 'username' : 'email'} `, 'value already exists'); return }

        const id = await this.auth.add({ userId: userResp.id, password: req.input.password, role: req.input.role })
        res.status(201).json({ id })
        return
      }
    )

    router.post('/login',
      //TODO: Handle login in without existing user. Currently it crashes
      this.bodyInput(),
      this.validate(Joi.object({
        username: Joi.string().max(33),
        email: Joi.string().email(),
        password: Joi.string().min(8).max(20).required()
      })),
      async (req: any, res: any, next: any) => {
        await next()
        const userIdentifier = req.input.username ?? req.input.email
        if (!userIdentifier) { this.fail(res, 422, `body.user`, 'value required'); return }

        const userResp = await this.users.findOne(userIdentifier)
        if (!userResp) { this.fail(res, 404, `body.user`, 'value does not exist'); return }
        const user = userResp

        const authResp = await this.auth.validatePassword({ userId: user.id, password: req.input.password })
        if (!authResp) { this.fail(res, 422, `body.password`, 'value does not exist'); return }
        const actor = authResp

        res.status(200).json(this.authorize.accredit(actor))
        return
      }
    )

    //TODO: Recover password needs to be an email sent out

    return router
  }
}