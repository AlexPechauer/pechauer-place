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
    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    router.get('/:branchId',
    )

    router.put('/:branchId',
    )

    router.delete('/:branchId',
    )

    return [
      new Guestbook.Route(this.app).build(),
      // this.app.use('/:branchId/guestbook', new Guestbook.Route(this.app).build()),
      router
    ]
  }
}