import { Pool } from 'pg'
import { loadDbConfig } from '../component/config'
import { Criteria, IModel } from './domain'
import { camelToSnake, genColsDolsVals, whereStatementBuilder, objectNamesGenerator } from './utils'

interface BaseItem {
  id: string
}

export class BaseModel<Item extends BaseItem> implements IModel<Item> {

  pool: Pool

  name: string

  columns: string[]

  private get tableName() {
    return camelToSnake(this.name)
  }

  private get columnNames() {
    return this.columns.map(x => camelToSnake(x))
  }

  constructor() {
    const credentials = loadDbConfig()
    this.pool = new Pool(credentials)
    this.pool.connect()
  }

  async add(object: Object): Promise<string | undefined> {
    const { columns, dollars, values } = genColsDolsVals(object)
    const text = `INSERT INTO ${this.tableName}(${columns}) VALUES(${dollars}) RETURNING id;`

    const response = await this.dbCallOne<Item>(text, values)
    return response?.id
  }

  async update(object: Object, criteria: Criteria): Promise<string | undefined> {
    const { columns, dollars, values } = genColsDolsVals(object)
    const whereStatement = whereStatementBuilder(criteria)
    let text = `UPDATE ${this.tableName} SET `

    for (let i = 0; i < columns.length; i++) {
      const appendComma = columns.length > (i + 1) ? ',' : ''
      text = text + columns[i] + '=' + dollars[i] + appendComma
    }
    text = `${text} ${whereStatement} RETURNING id;`

    const response = await this.dbCallOne<Item>(text, values)
    return response?.id
  }

  //TODO: Paginate
  async findAll(criteria?: Criteria): Promise<Item[] | undefined> {
    let values: string[] = []
    let whereStatement = ''
    if (criteria) {
      values = criteria.map(c => c.value)
      whereStatement = whereStatementBuilder(criteria)
    }
    const text = `SELECT ${this.columnNames} FROM ${this.tableName} ${whereStatement};`
    const rows = await this.dbCallMany<Item[]>(text, values)
    //TODO: Clean this up
    if (rows) { return (rows.map(row => objectNamesGenerator(row)) as Item[]) }

    return undefined
  }

  async findOne(criteria: Criteria): Promise<Item | undefined> {
    const values = criteria.map(c => c.value)
    const whereStatement = whereStatementBuilder(criteria)
    const text = `SELECT ${this.columnNames} FROM ${this.tableName} ${whereStatement};`
    const row = await this.dbCallOne<Item>(text, values)
    //TODO: Clean this up
    if (row) { return (objectNamesGenerator(row) as Item) }

    return undefined
  }

  async delete(criteria: Criteria): Promise<void> {
    const values = criteria.map(c => c.value)
    const whereStatement = whereStatementBuilder(criteria)
    const text = `DELETE FROM ${this.tableName} ${whereStatement};`
    await this.dbCallOne<Item>(text, values)
  }

  async dbCallMany<Item>(text: string, values: any[]): Promise<Item[] | undefined> {
    try {
      const res = await (this.pool.query(text, values) as any)
      return res.rows
    } catch (err) {
      console.log('Db messed up or something, ', err.stack)
      console.log('text', text)
      console.log('values', values)
    }
    return undefined
  }

  async dbCallOne<Item>(text: string, values: any[]): Promise<Item | undefined> {
    const res = await this.dbCallMany<Item>(text, values)
    if (!res) { return undefined }
    return res[0]
  }

}