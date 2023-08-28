import { Router, Express } from 'express'
import * as Model from '../../../model'
import { Base } from '../../base'
import * as bodyParser from 'body-parser'

export class Route extends Base {

  comments: Model.Blog.Comment.Collection

  constructor(app: Express) {
    super(app)

    this.comments = new Model.Blog.Comment.Collection()
  }

  build = (): Router => {

    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    router.post('',
    )

    router.get('/:commentId',
    )

    router.put('/:commentId',
    )

    router.delete('/:commentId',
    )

    return router
  }
}