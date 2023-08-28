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

    router.post('/:blogId/comments',
    )

    router.get('/:blogId/comments/:commentId',
      async (req: any, res: any, next: any) => {
        console.log('herere')
        await next()
      },
    )

    router.put('/:blogId/comments/:commentId',
    )

    router.delete('/:blogId/comments/:commentId',
    )

    return router
  }
}