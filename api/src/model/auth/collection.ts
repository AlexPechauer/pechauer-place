import { BaseModel } from '../base'
import { Actor, Role } from './role/domain'
import * as Auth from './domain'
import { pick } from 'lodash'
import { createId, encrypt, hash } from '../utils'
import { Criteria } from '../domain'

export class Collection extends BaseModel<Auth.Value> {

  name = 'auth'

  columns = Object.keys(Auth.schema)

  async add(credentials: any): Promise<string | undefined> {
    const { salted, hashed } = encrypt(credentials.password)
    const auth = {
      id: createId(),
      salted,
      hashed,
      ...pick(credentials, 'userId', 'roles')
    }

    return super.add(auth as any)
  }

  async validatePassword(object: any): Promise<Actor | undefined> {
    const text = 'SELECT * FROM auth where user_id = $1'
    const values = [object.userId.toLowerCase()]
    const resp = await this.dbCall(text, values) as any

    if (resp.hash != hash(object.password, resp.salt)) { return undefined }

    return { id: object.userId, role: resp.role }
  }

  async findOne(criteria: Criteria): Promise<Auth.Value | undefined> {
    const text = 'SELECT * FROM auth where user_id = $1'
    // const values = [userId]
    const values = ['userId']
    return await this.dbCall(text, values)
  }

  async update(user: { id: string, password: string, role: Role[] }): Promise<string | undefined> {
    const text = 'UPDATE auth SET salt = $1, hash = $2 WHERE user_id = $3 RETURNING id;'
    const { salted, hashed } = encrypt(user.password)
    const values = [
      salted,
      hashed,
      // user.role,
      user.id
    ]

    const response = await this.dbCall<Auth.Value>(text, values)
    console.log('response', response)
    return response?.id
  }

}