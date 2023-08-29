import * as Comment from './comment'
import { Router, Express } from 'express'
import * as Model from '../../../model'
import { Base } from '../../base'
import * as bodyParser from 'body-parser'

export class Routes extends Base {

  app: Express

  entries: Model.Blog.Entry

  constructor(app: Express) {
    super(app)
    this.app = app

    this.entries = new Model.Blog.Entry()
  }

  build = (): Router[] => {
    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    router.post('entries/',
    )

    router.get('entries/:entryId',
    )

    router.put('entries/:entryId',
    )

    router.delete('entries/:entryId',
    )

    return [
      new Comment.Route(this.app).build(),
      router
    ]
  }
}