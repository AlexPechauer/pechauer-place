import { Router, Express } from 'express'
import * as Model from '../../../../model'
import { Base } from '../../../base'
import * as bodyParser from 'body-parser'

export class SubRoutes extends Base {

  entries: Model.Branch.Guestbook.Entry.Collection

  guestbooks: Model.Branch.Guestbook.Collection

  constructor(app: Express) {
    super(app)

    this.entries = new Model.Branch.Guestbook.Entry.Collection()
    this.guestbooks = new Model.Branch.Guestbook.Collection()
  }

  build = (parentPath: string): Router => {

    const pluralPath = `${parentPath}/guestbook/entries`

    const singularPath = `${pluralPath}/:entryId`

    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    //TODO: Send back a jwt or something
    router.post(pluralPath,
      this.bodyInput(),
      async (req: any, res: any, next: any) => {
        const guestbook = await this.guestbooks.findOne([{ column: 'branchId', value: req.params.branchId }])
        if (!guestbook) { this.fail(res, 404, `global`, 'branch does not have a guestbook'); return }
        req.input = { guestbookId: guestbook.id, ...req.input }
        await next()
      },
      this.validate(Model.Branch.Guestbook.Entry.schema),
      this.add(this.entries),
      this.renderJson({ statusCode: 201 })
    )

    router.get(singularPath,
      this.getOne(this.entries, 'entryId'),
      this.renderJson()
    )

    //TODO: Must be name of OG
    router.put(singularPath,
    )


    //TODO: Must be name of OG or admin
    router.delete(singularPath,
    )

    return router
  }
}