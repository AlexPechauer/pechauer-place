import * as Guestbook from './guestbook'
import { Router, Express } from 'express'
import { Base } from '../base'
import * as bodyParser from 'body-parser'
import * as Model from '../../model'

export class Routes extends Base {

  app: Express

  branches: Model.Branch.Collection

  constructor(app: Express) {
    super(app)
    this.app = app

    this.branches = new Model.Branch.Collection()
  }

  build = (): Router[] => {

    const pluralPath = ''

    const singularPath = `${pluralPath}/:branchId`

    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    router.get(singularPath,
      this.getOne(this.branches, 'branchId'),
      this.renderJson()
    )

    //TODO: Admin can only
    router.put(singularPath,
    )

    return [
      new Guestbook.Entry.SubRoutes(this.app).build(singularPath),
      router
    ]
  }
}