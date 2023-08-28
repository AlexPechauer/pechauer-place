import { BaseModel } from '../base'
import { Role } from './role/domain'
import * as Auth from './domain'
import { pick } from 'lodash'
import { createId, encrypt, hasher } from '../utils'
import { Criteria } from '../domain'

export class Collection extends BaseModel<Auth.Value> {

  name = 'auth'

  columns = Object.keys(Auth.schema.describe().keys)

  async add(credentials: any): Promise<string | undefined> {
    const { salt, hash } = encrypt(credentials.password)
    const auth = {
      id: createId(),
      salt,
      hash,
      ...pick(credentials, 'userId', 'roles')
    }

    return super.add(auth as any)
  }

  //TODO: Probably should return actor and plug into the user db here, but whatever
  async validatePassword(password: string, criteria: Criteria): Promise<Role[] | undefined> {
    const resp = await super.findOne(criteria)
    if (!resp || resp.hash != hasher(password, resp.salt)) { return undefined }

    return resp.roles
  }

  async update(user: { id: string, password: string, role: Role[] }, criteria: Criteria): Promise<string | undefined> {
    const { salt, hash } = encrypt(user.password)
    const updateUser = {
      userId: user.id,
      salt,
      hash,
    }

    return super.update(updateUser, criteria)
  }

}