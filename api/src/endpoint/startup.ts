import { Express } from 'express'
import { Auth, Blog, Branch, Home, User } from './index'
import { loadConfiguredCors } from '../component/config'


export const startup = (app: Express) => {
  app.use(loadConfiguredCors())

  const auth = new Auth.Route(app)
  app.use(route('auth'), auth.build())

  const blog = new Blog.Routes(app)
  app.use(route('blog'), blog.build())

  const branch = new Branch.Routes(app)
  app.use(route('branch'), branch.build())

  const home = new Home.Route(app)
  app.use(route(), home.build())

  const user = new User.Route(app)
  app.use(route('user'), user.build())

  app.use((req: any, res: any) => {
    res.status(404)
  })

  app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.message)
    res.status(500)
  })
};

const route = (path?: string): string => {
  if (!path) { return '/api/' }
  return '/api/'.concat(path)
}