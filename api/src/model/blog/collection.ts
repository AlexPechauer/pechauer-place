import { BaseModel } from '../base'
import * as Blog from './domain'

export class Collection extends BaseModel<Blog.Value> {

  name = 'blog'

  columns = Object.keys(Blog.schema.describe().keys)

}