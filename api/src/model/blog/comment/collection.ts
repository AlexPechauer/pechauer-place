import { BaseModel } from '../../base'
import * as Comment from './domain'

export class Collection extends BaseModel<Comment.Value> {

  name = 'blogComment'

  columns = Object.keys(Comment.schema.describe().keys)

}