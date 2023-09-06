import { Router, Express } from 'express'
import * as Model from '../../../../model'
import { Base } from '../../../base'
import * as bodyParser from 'body-parser'

export class Route extends Base {

  comments: Model.Blog.Entry.Comment.Collection

  constructor(app: Express) {
    super(app)

    this.comments = new Model.Blog.Entry.Comment.Collection()
  }

  build = (): Router => {

    const pluralPath = '/comments'

    const singularPath = `${pluralPath}/:commentId`

    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    router.post(pluralPath,
    )

    router.get(singularPath,
      async (req: any, res: any, next: any) => {
        console.log('herere')
        await next()
      },
    )

    router.put(singularPath,
    )

    router.delete(singularPath,
    )

    return router
  }
}