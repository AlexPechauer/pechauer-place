import { BaseModel } from '../base'
import * as Entry from './domain'

export class Collection extends BaseModel<Entry.Value> {

  async add(entry: Entry.Value): Promise<string | undefined> {
    const id = this.createId()

    entry.created_at = new Date()
    entry.updated_at = new Date()

    const text = 'INSERT INTO guestbook(id) '
      + 'VALUES($1) RETURNING id;'

    const values = [id,]
    const response = await this.dbCall<Entry.Value>(text, values)

    return response?.id
  }

  async delete(entry: string): Promise<void> {
    const text = 'DELETE FROM guestbook WHERE id = $1'
    const values = [entry]
    await this.dbCall(text, values)
  }

  async update(entry: Entry.Value): Promise<string | undefined> {
    const text = 'UPDATE guestbook SET username = $1,  WHERE id = $n+1 RETURNING id;'

    const values = [
      // entry.username,
      new Date(),
      entry.id
    ]

    const response = await this.dbCall<Entry.Value>(text, values)
    return response?.id
  }

  //TODO: paginate
  // findAll
}
