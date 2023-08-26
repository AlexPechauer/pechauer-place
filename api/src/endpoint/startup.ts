import { Express } from 'express'
import { Auth, Branch, Home, User } from './index'
import { loadConfiguredCors } from '../component/config'


export const startup = (app: Express) => {
  app.use(loadConfiguredCors())

  const auth = new Auth.Route(app)
  app.use(route('auth'), auth.build())

  const branch = new Branch.SubRoutes(app)
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