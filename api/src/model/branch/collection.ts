import { BaseModel } from '../base'
import { Criteria } from '../domain'
import { createId } from '../utils'
import * as Branch from './domain'

export class Collection extends BaseModel<Branch.Value> {

  name = 'branch'

  columns = Object.keys(Branch.schema.describe().keys)

  async add(branch: Branch.Value): Promise<string | undefined> {
    branch.id = createId()
    return super.add(branch)
  }

  async update(branch: Branch.Value, criteria: Criteria): Promise<string | undefined> {
    return super.update(branch, criteria)
  }

}