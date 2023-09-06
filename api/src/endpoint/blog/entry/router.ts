import * as Comment from './comment'
import { Router, Express } from 'express'
import * as Model from '../../../model'
import { Base } from '../../base'
import * as bodyParser from 'body-parser'

export class Routes extends Base {

  app: Express

  entries: Model.Blog.Entry.Collection

  constructor(app: Express) {
    super(app)
    this.app = app

    this.entries = new Model.Blog.Entry.Collection()
  }

  build = (): Router[] => {

    const pluralPath = '/entries'

    const singularPath = `${pluralPath}/:entryId`

    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    router.post(pluralPath,
    )

    router.get(singularPath,
    )

    router.put(singularPath,
    )

    router.delete(singularPath,
    )

    return [
      new Comment.Route(this.app).build(),
      router
    ]
  }
}