import { Client } from 'pg'
import * as Crypto from 'crypto'
import { loadDbConfig } from '../component/config'
import { IModel, Encrypted } from './domain'

interface BaseItem {
  id: string
}

export class BaseModel<Item extends BaseItem> implements IModel<Item> {

  client: Client

  name: string

  private get tableName() {
    return this.camelToSnake(this.name)
  }

  constructor() {
    const credentials = loadDbConfig()
    this.client = new Client(credentials)
    this.client.connect()
  }

  hex(): string { return Crypto.randomBytes(33).toString('hex').substring(0, 32) }
  hash(value: string, salt: string): string { return Crypto.pbkdf2Sync(value, salt, 1000, 64, `sha512`).toString(`hex`) }

  encrypt(value: string): Encrypted {
    const salt = this.hex()
    const hash = this.hash(value, salt)
    return { salt, hash }
  }

  createId(): string { return this.hex() }

  async add(object: Item): Promise<string | undefined> {
    const { columns, dollars, values } = this.genColsDolsVals(object)
    const text = `INSERT INTO ${this.tableName}(${columns}) VALUES(${dollars}) RETURNING id;`
    const response = await this.dbCall<Item>(text, values)
    return response?.id
  }

  async update(object: Partial<Item>): Promise<string | undefined> {
    console.log('Db update function not implemented.')
    return undefined
  }

  async findAll(value: string): Promise<Item | undefined> {
    console.log('Db findAll function not implemented.')
    return undefined
  }

  async findOne(value: string): Promise<Item | undefined> {
    console.log('Db findOne function not implemented.')
    return undefined
  }

  async delete(value: string): Promise<void> {
    console.log('Db delete function not implemented.')
    return undefined
  }

  async dbCall<Item>(text: string, values: any[]): Promise<Item | undefined> {
    try {
      const insertValues = values.map(x => x.toLowerCase())
      const res = await (this.client.query(text, insertValues) as any)
      return res.rows[0]
    } catch (err) {
      console.log('Db messed up or something, ', err.stack)
    }
    return undefined
  }

  camelToSnake = (x: any) => x.toString().replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()

  columnNamesGenerator = (object: Item) => this.camelToSnake(Object.keys(object))

  valuesGenerator = (object: Item) => Object.values(object).map((x) => {
    switch (typeof x) {
      case 'string': {
        x.toLowerCase()
        break
      }
      case 'object': {
        x = JSON.stringify(x)
        break
      }
      default: {
        break
      }
    }
    return x
  })

  dollarSignValuesGenerator = (object: Item) => Array.from({ length: Object.keys(object).length }, (_, index) => '$' + (index + 1).toString())

  genColsDolsVals = (object: Item) => {
    return {
      columns: this.columnNamesGenerator(object),
      dollars: this.dollarSignValuesGenerator(object),
      values: this.valuesGenerator(object)
    }
  }

}