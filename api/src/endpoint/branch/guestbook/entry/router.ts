import { Router, Express } from 'express'
import * as Model from '../../../../model'
import { Base } from '../../../base'
import * as bodyParser from 'body-parser'

export class Route extends Base {

  entries: Model.Branch.Guestbook.Collection

  constructor(app: Express) {
    super(app)

    this.entries = new Model.Branch.Guestbook.Collection()
  }

  build = (): Router => {

    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    router.post('/:branchId/guestbook',
      this.paramsInput(),
      this.bodyInput(),
      async (req: any, res: any, next: any) => {
        console.log('req.input', req.input)
        await next()
      },
      this.validate(Model.Branch.Guestbook.schema),

      this.add(this.entries),
      this.renderJson({ statusCode: 201 })
    )

    router.get('/:branchId/guestbook/:entry',
    )

    router.put('/:branchId/guestbook/:entry',
    )

    router.delete('/:branchId/guestbook/:entry',
    )

    return router
  }
}