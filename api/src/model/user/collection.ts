import { BaseModel } from '../base'
import * as User from './domain'

export class Collection extends BaseModel<User.Value> {

  name = 'userProfile'

  async add(user: User.Value): Promise<string | undefined> {
    user.id = this.createId()
    user.created_at = new Date()
    user.updated_at = new Date()

    return super.add(user)
  }

  async delete(user: string): Promise<void> {
    const text = 'DELETE FROM user_profile WHERE id = $1 or username = $1'
    const values = [user]
    await this.dbCall(text, values)
  }

  async update(user: User.Value): Promise<string | undefined> {
    const text = 'UPDATE user_profile SET username = $1, first_name = $2, last_name = $3, status = $4, email = $5, address = $6, updated_by = $7, updated_at = $8 WHERE id = $9 RETURNING id;'

    const values = [
      user.username,
      user.first_name,
      user.last_name,
      user.status,
      user.email,
      user.address,
      user.updated_by,
      new Date(),
      user.id
    ]

    const response = await this.dbCall<User.Value>(text, values)
    return response?.id
  }

  async findOne(user: string): Promise<User.Value | undefined> {
    const text = 'SELECT * FROM user_profile where id = $1 or username = $1 or email = $1'
    const values = [user.toLowerCase()]
    console.log('text', text)
    console.log('values', values)
    return await this.dbCall(text, values)
  }
}