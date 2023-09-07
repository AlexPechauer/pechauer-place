import * as Comment from './comment'
import { Router, Express } from 'express'
import * as Model from '../../../model'
import { Base } from '../../base'
import * as bodyParser from 'body-parser'

export class SubRoutes extends Base {

  app: Express

  entries: Model.Blog.Entry.Collection

  constructor(app: Express) {
    super(app)
    this.app = app

    this.entries = new Model.Blog.Entry.Collection()
  }

  build = (parentPath: string): Router[] => {

    const pluralPath = `${parentPath}/entries`

    const singularPath = `${pluralPath}/:entryId`

    const router = Router()
    router.use(parentPath,
      this.acceptJson(),
      bodyParser.json()
    )

    router.post(pluralPath,
      this.paramsInput(),
      this.bodyInput(),
      this.validate(Model.Blog.Entry.schema),
      this.add(this.entries),
      this.renderJson({ statusCode: 201 })
    )

    router.get(singularPath,
      this.getOne(this.entries, 'entryId'),
      this.renderJson()
    )

    router.put(singularPath,
      this.bodyInput(),
      this.validate(Model.Blog.Entry.schema),
      this.getOne(this.entries, 'entryId'),
      this.update(this.entries, 'entryId'),
      this.renderJson({ statusCode: 200 })
    )

    router.delete(singularPath,
      this.getOne(this.entries, 'entryId'),
      this.delete(this.entries, 'entryId'),
      this.renderJson()
    )

    return [
      new Comment.SubRoutes(this.app).build(singularPath),
      router
    ]
  }
}