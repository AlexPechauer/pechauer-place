import * as Comment from './comment'
import { Router, Express } from 'express'
import * as Model from '../../model'
import { Base } from '../base'
import * as bodyParser from 'body-parser'

export class Routes extends Base {

  app: Express

  blogs: Model.Blog.Collection

  constructor(app: Express) {
    super(app)
    this.app = app
  }

  build = (): Router[] => {
    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    router.post('',
      this.authorize.can(),
      this.bodyInput(),
      this.validate(Model.Blog.schema),
      this.add(this.blogs),
      this.renderJson({ statusCode: 201 }),
      async (req: any, res: any, next: any) => {
        console.log('here!')
      }
    )

    router.get('/:blogId',
    )

    router.put('/:blogId',
    )

    router.delete('/:blogId',
    )

    return [
      new Comment.Route(this.app).build(),
      router
    ]
  }
}