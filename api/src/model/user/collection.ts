import { BaseModel } from '../base'
import * as User from './domain'
import { createId } from '../utils'
import { Criteria } from '../domain'

export class Collection extends BaseModel<User.Value> {

  name = 'userProfile'

  columns = Object.keys(User.schema.describe().keys)

  async add(user: User.Value): Promise<string | undefined> {
    user.id = createId()
    user.createdAt = new Date()
    user.updatedAt = new Date()

    return super.add(user)
  }

  async update(user: User.Value, criteria: Criteria): Promise<string | undefined> {
    user.updatedAt = new Date()
    return super.update(user, criteria)
  }

}