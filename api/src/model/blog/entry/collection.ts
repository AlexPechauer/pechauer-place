import { BaseModel } from '../../base'
import { Criteria } from '../../domain'
import { createId } from '../../utils'
import * as BlogEntry from './domain'

export class Collection extends BaseModel<BlogEntry.Value> {

  name = 'blogEntry'

  columns = Object.keys(BlogEntry.schema.describe().keys)

  async add(user: BlogEntry.Value): Promise<string | undefined> {
    user.id = createId()
    user.createdAt = new Date()
    user.updatedAt = new Date()

    return super.add(user)
  }

  async update(user: BlogEntry.Value, criteria: Criteria): Promise<string | undefined> {
    user.updatedAt = new Date()
    return super.update(user, criteria)
  }

}