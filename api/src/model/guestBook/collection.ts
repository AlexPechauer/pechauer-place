import { BaseModel } from '../base'
import * as Entry from './domain'

export class Collection extends BaseModel<Entry.Value> {

  async add(entry: Entry.Value): Promise<string | undefined> {
    const id = this.createId()

    entry.createdAt = new Date()
    entry.updatedAt = new Date()

    const text = 'INSERT INTO guestbook(id, branch_id, first_name, title, message, created_by, created_at, updated_by, updated_at) '
      + 'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;'

    const values = [
      id,
      entry.branchId,
      entry.firstName.toLowerCase(),
      entry.title,
      entry.message,
      entry.createdBy,
      entry.createdAt,
      entry.updatedBy,
      entry.updatedAt
    ]
    const response = await this.dbCall<Entry.Value>(text, values)

    return response?.id
  }

  async delete(entry: string): Promise<void> {
    const text = 'DELETE FROM guestbook WHERE id = $1'
    const values = [entry]
    await this.dbCall(text, values)
  }

  async update(entry: Entry.Value): Promise<string | undefined> {
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
  // async findAll(branch_id: string) {

  // }
}
