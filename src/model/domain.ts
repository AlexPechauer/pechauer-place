export interface IModel<Item> {
  add: (object: Item) => Promise<string | undefined>
  update: (object: Item) => Promise<string | undefined>
  findOne: (value: string) => Promise<Item | undefined>
  delete: (value: string) => Promise<void>
}

export interface Encrypted {
  salt: string,
  hash: string
}

export const modifiers = [
  'id',
  'created_by',
  'created_at',
  'updated_by',
  'updated_at'
]