import { Client } from 'pg'
import * as Crypto from 'crypto'
import { loadDbConfig } from '../component/config'
import { IModel, Encrypted } from './domain'

export class BaseModel<Item> implements IModel<Item> {

  client: Client

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
    console.log('Db add function not implemented.')
    return undefined
  }

  async update(object: Partial<Item>): Promise<string | undefined> {
    console.log('Db update function not implemented.')
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
      const res = await (this.client.query(text, values) as any)
      return res.rows[0]
    } catch (err) {
      console.log(err.stack)
    }
    return undefined
  }
}