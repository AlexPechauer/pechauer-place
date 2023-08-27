import { BaseModel } from '../base'
import * as Branch from './domain'

export class Collection extends BaseModel<Branch.Value> {

  name = 'branch'

  columns = Object.keys(Branch.schema.describe().keys)

}