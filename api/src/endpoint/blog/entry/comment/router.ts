import { Router, Express } from 'express'
import * as Model from '../../../../model'
import { Base } from '../../../base'
import * as bodyParser from 'body-parser'

export class SubRoutes extends Base {

  comments: Model.Blog.Entry.Comment.Collection

  constructor(app: Express) {
    super(app)

    this.comments = new Model.Blog.Entry.Comment.Collection()
  }

  build = (parentPath: string): Router => {

    const pluralPath = `${parentPath}/comments`

    const singularPath = `${pluralPath}/:commentId`

    const router = Router()
    router.use(parentPath,
      this.acceptJson(),
      bodyParser.json()
    )

    router.get(pluralPath,
      this.getAll(this.comments),
      this.renderJson()
    )

    router.post(pluralPath,
      this.bodyInput(),
      async (req: any, res: any, next: any) => {
        req.input = { blogEntryId: req.params.entryId, ...req.input }

        console.log('req.input', req.input)
        await next()
      },
      this.validate(Model.Blog.Entry.Comment.schema),
      // this.add(this.comments),
      // this.renderJson({ statusCode: 201 })
    )

    router.get(singularPath,
      this.getOne(this.comments, 'commentId'),
      this.renderJson()
    )

    router.put(singularPath,
    )

    router.delete(singularPath,
    )

    return router
  }
}