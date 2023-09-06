import * as Entry from './entry'
import { Router, Express } from 'express'
import * as Model from '../../../model'
import { Base } from '../../base'
import * as bodyParser from 'body-parser'

export class Routes extends Base {

  guestbooks: Model.Branch.Guestbook.Collection

  constructor(app: Express) {
    super(app)
    this.app = app

    this.guestbooks = new Model.Branch.Guestbook.Collection()
  }

  build = (): Router[] => {

    const pluralPath = '/guestbooks'

    const singularPath = `${pluralPath}/:guestbookId`

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
      new Entry.Route(this.app).build(),
      router
    ]
  }
}