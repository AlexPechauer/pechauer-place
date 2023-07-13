import { Express } from 'express'
import * as Auth from './auth'
import * as Home from './home'
import * as User from './user'
import { loadConfiguredCors } from '../component/config'

export const startup = (app: Express) => {
  app.use(loadConfiguredCors())

  const auth = new Auth.Route(app)
  app.use(route('auth'), auth.build())

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