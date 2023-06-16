import { BaseModel } from '../base'
import { Actor, Role } from './role/domain'
import * as Auth from './domain'

export class Collection extends BaseModel<Auth.Value> {

  //TODO: Add db name here so you can pul the adds to base and abstract that shit
  //TODO: Youll have to set up criteria too
  async add(object: any): Promise<string | undefined> {
    const id = this.createId()

    const text = 'INSERT INTO auth(id, userId, salt, hash, role) '
      + 'VALUES($1, $2, $3, $4, $5) RETURNING id;'

    const { salt, hash } = this.encrypt(object.password)
    const values = [id, object.userId, salt, hash, object.role]
    const response = await this.dbCall<Auth.Value>(text, values)
    return response?.id
  }

  async validatePassword(object: any): Promise<Actor | undefined> {
    const text = 'SELECT * FROM auth where userId = $1'
    const values = [object.userId.toLowerCase()]
    const resp = await this.dbCall(text, values) as any

    if (resp.hash != this.hash(object.password, resp.salt)) { return undefined }

    return { id: object.userId, role: resp.role }
  }

  async findOne(userId: string): Promise<Auth.Value | undefined> {
    const text = 'SELECT * FROM auth where userId = $1'
    const values = [userId]
    return await this.dbCall(text, values)
  }

  async update(user: { id: string, password: string, role: Role[] }): Promise<string | undefined> {
    const text = 'UPDATE auth SET salt = $1, hash = $2 WHERE userId = $3 RETURNING id;'
    const { salt, hash } = this.encrypt(user.password)
    const values = [
      salt,
      hash,
      // user.role,
      user.id
    ]

    const response = await this.dbCall<Auth.Value>(text, values)
    console.log('response', response)
    return response?.id
  }

}