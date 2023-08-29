import { BaseModel } from '../base'
import { Criteria } from '../domain'
import { createId } from '../utils'
import * as Blog from './domain'

export class Collection extends BaseModel<Blog.Value> {

  name = 'blog'

  columns = Object.keys(Blog.schema.describe().keys)

  async add(user: Blog.Value): Promise<string | undefined> {
    user.id = createId()
    user.createdAt = new Date()
    user.updatedAt = new Date()

    return super.add(user)
  }

  async update(user: Blog.Value, criteria: Criteria): Promise<string | undefined> {
    user.updatedAt = new Date()
    return super.update(user, criteria)
  }

}