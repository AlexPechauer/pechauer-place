import { BaseModel } from '../../../base'
import { Criteria } from '../../../domain'
import { createId } from '../../../utils'
import * as Entry from './domain'

export class Collection extends BaseModel<Entry.Value> {

  name = 'guestbookEntry'

  columns = Object.keys(Entry.schema.describe().keys)

  async add(entry: Entry.Value): Promise<string | undefined> {
    entry.id = createId()
    entry.createdAt = new Date()
    entry.updatedAt = new Date()

    return super.add(entry)
  }

  async update(entry: Entry.Value, criteria: Criteria): Promise<string | undefined> {
    entry.updatedAt = new Date()
    return super.update(entry, criteria)
  }

  // //TODO: paginate
  // async findAll(criteria: Criteria) {
  //   return undefined
  // }
}
