import { BaseModel } from '../../base'
import { Criteria } from '../../domain'
import { createId } from '../../utils'
import * as Guestbook from './domain'

export class Collection extends BaseModel<Guestbook.Value> {

  name = 'guestbook'

  columns = Object.keys(Guestbook.schema.describe().keys)

  async add(entry: Guestbook.Value): Promise<string | undefined> {
    entry.id = createId()
    entry.createdAt = new Date()
    entry.updatedAt = new Date()

    return super.add(entry)
  }

  async update(entry: Guestbook.Value, criteria: Criteria): Promise<string | undefined> {
    entry.updatedAt = new Date()
    return super.update(entry, criteria)
  }

  // //TODO: paginate
  // async findAll(criteria: Criteria) {
  //   return undefined
  // }
}
