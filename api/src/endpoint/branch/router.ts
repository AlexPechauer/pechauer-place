import * as Guestbook from './guestbook'
import { Router, Express } from 'express'

export class SubRoutes {

  app: Express


  constructor(app: Express) {
    this.app = app
  }

  build = (): Router[] => {
    return [
      new Guestbook.Route(this.app).build()
    ]
  }
}