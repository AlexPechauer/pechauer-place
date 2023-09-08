import * as Entry from './entry'
import { Router, Express } from 'express'
import * as Model from '../../model'
import { Base } from '../base'
import * as bodyParser from 'body-parser'
import { Role } from '../../model/auth/role/domain'

export class Routes extends Base {

  app: Express

  blogs: Model.Blog.Collection

  constructor(app: Express) {
    super(app)
    this.app = app

    this.blogs = new Model.Blog.Collection()
  }

  build = (): Router[] => {

    const pluralPath = ''

    const singularPath = `${pluralPath}/:blogId`

    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    router.get(pluralPath,
      this.getAll(this.blogs),
      this.renderJson()
    )

    router.post(pluralPath,
      this.authorize.can([Role.SUPER_ADMIN]),
      this.bodyInput(),
      this.validate(Model.Blog.schema),
      async (req: any, res: any, next: any) => {
        req.input.blogTypeId = Model.Blog.Type.Type[req.input.blogTypeId]
        await next()
      },
      this.add(this.blogs),
      this.renderJson({ statusCode: 201 })
    )

    router.get(singularPath,
      this.paramsInput(),
      this.getOne(this.blogs, 'blogId'),
      this.renderJson()
    )

    router.delete(singularPath,
      this.authorize.can([Role.SUPER_ADMIN]),
      this.paramsInput(),
      this.getOne(this.blogs, 'blogId'),
      this.delete(this.blogs, 'blogId'),
      this.renderJson()
    )

    return [
      router,
      ...new Entry.SubRoutes(this.app).build(singularPath)
    ]
  }
}