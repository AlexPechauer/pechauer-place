import { Express } from 'express'
import { Auth, Blog, Branch, Home, User } from './index'
import { loadConfiguredCors } from '../component/config'

export const startup = (app: Express) => {
  app.use(loadConfiguredCors())

  app.use('', async (req: any, res: any, next: any) => {
    res.statusCode = 404
    await next()
  })

  const auth = new Auth.Route(app)
  app.use(route('/auth'), auth.build())

  //TODO: make sure there isn't some weird pass through
  const blog = new Blog.Routes(app)
  app.use(route('/blogs'), blog.build())

  const branch = new Branch.Routes(app)
  app.use(route('/branches'), branch.build())

  const home = new Home.Route(app)
  app.use(route('/home'), home.build())

  const user = new User.Route(app)
  app.use(route('/users'), user.build())

  app.use('', async (req: any, res: any, next: any) => {
    await next()
    if (res.statusCode === 404) {
      res.json({
        context: 'path',
        body: 'page not found'
      })
    }
  })

};

const route = (path?: string): string => {
  if (!path) { return '/api' }
  return '/api'.concat(path)
}