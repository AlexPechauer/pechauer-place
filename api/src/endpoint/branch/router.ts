import * as Guestbook from './guestbook'
import { Router, Express } from 'express'
import { Base } from '../base'
import * as bodyParser from 'body-parser'

export class Routes extends Base {

  app: Express

  constructor(app: Express) {
    super(app)
    this.app = app
  }

  build = (): Router[] => {

    const pluralPath = ''

    const singularPath = `${pluralPath}/:branchId`

    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    router.get(singularPath,
    )

    router.put(singularPath,
    )

    router.delete(singularPath,
    )

    return [
      ...new Guestbook.Routes(this.app).build(),
      router
    ]
  }
}