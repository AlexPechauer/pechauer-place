import { BaseModel } from '../base'
import { Criteria } from '../domain'
import { createId } from '../utils'
import * as Entry from './domain'

export class Collection extends BaseModel<Entry.Value> {

  name = 'guestbook'

  columns = Object.keys(Entry.schema)

  async add(entry: Entry.Value): Promise<string | undefined> {
    entry.id = createId()
    entry.createdAt = new Date()
    entry.updatedAt = new Date()

    return super.add(entry)
  }

  async delete(criteria: Criteria): Promise<void> {
    const text = 'DELETE FROM guestbook WHERE id = $1'
    // const values = [entry]
    const values = ['entry']
    await this.dbCall(text, values)
  }

  async update(entry: Entry.Value, criteria: Criteria): Promise<string | undefined> {
    const text = 'UPDATE guestbook SET username = $1, first_name = $2, title = $3, message = $4, updated_by = $5, updated_at = $6, WHERE id = $1 RETURNING id;'

    const values = [
      entry.firstName.toLowerCase(),
      entry.title,
      entry.message,
      entry.updatedBy,
      entry.updatedAt
    ]

    const response = await this.dbCall<Entry.Value>(text, values)
    return response?.id
  }

  //TODO: paginate
  async findAll(criteria: Criteria) {
    return undefined
  }

  async findOne(criteria: Criteria) {
    return undefined
  }
}
