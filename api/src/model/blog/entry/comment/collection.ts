import { BaseModel } from '../../../base'
import { Criteria } from '../../../domain'
import { createId } from '../../../utils'
import * as Comment from './domain'

export class Collection extends BaseModel<Comment.Value> {

  name = 'blogEntryComment'

  columns = Object.keys(Comment.schema.describe().keys)

  async add(user: Comment.Value): Promise<string | undefined> {
    user.id = createId()
    user.createdAt = new Date()
    user.updatedAt = new Date()

    return super.add(user)
  }

  async update(user: Comment.Value, criteria: Criteria): Promise<string | undefined> {
    user.updatedAt = new Date()
    return super.update(user, criteria)
  }

}