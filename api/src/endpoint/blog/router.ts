import * as Comment from './comment'
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

    router.post('',
    )

    router.get('/:blogId',
    )

    router.put('/:blogId',
    )

    router.delete('/:blogId',
    )

    return [
      new Comment.Route(this.app.use('/:blogId/comment')).build(),
      router
    ]
  }
}