import * as jwt from 'jsonwebtoken'
import { Actor } from '../../model/auth/role'
import { loadJwtConfig } from '../config'
import * as Model from '../../model'

export interface jwtPayload {
  actor: Actor
  timestamp: string
}

export class Authorize {

  jwtSecret: string
  jwtTimeout: number

  auth: Model.Auth.Collection

  constructor() {
    const { jwtSecret, jwtTimeout } = loadJwtConfig()
    this.jwtSecret = jwtSecret
    this.jwtTimeout = jwtTimeout
    this.auth = new Model.Auth.Collection()
  }

  generateJwt = (payload: jwtPayload): string => {
    return jwt.sign(payload, this.jwtSecret)
  }

  accredit = (actor: Actor): { token: string } => {

    const jwtPayload = {
      actor,
      timestamp: new Date().toString()
    }
    const token = this.generateJwt(jwtPayload)

    return { token }
  }

  can = (roles = Model.Auth.Role.all) => {
    return async (req: any, res: any, next: any) => {
      const authHeader = req.headers['authorization']
      if (!authHeader) { return res.status(403).json({ message: 'auth-token missing' }) }

      const token = authHeader.substring(7, authHeader.length)
      try {
        const payload = jwt.verify(token, this.jwtSecret) as any as jwtPayload
        const expired = this.jwtTimeout <= (new Date().getTime() - new Date(payload.timestamp).getTime())
        if (expired) { return res.status(403).json({ message: 'unauthorization' }) }

        const can = roles.some(role => payload.actor.role.includes(role))
        if (!can) { return res.status(403).json({ message: 'unauthorization' }) }
        req.input = { userId: payload.actor.id, ...req.input }
      } catch (err) {
        console.log('Error trying to authorize actor', err)
        return res.status(403).json({ message: 'unauthorization' })
      }
      await next()
    }
  }
}

