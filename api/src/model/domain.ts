export interface IModel<Item> {
  add: (object: Item) => Promise<string | undefined>
  update: (object: Item, criteria: Criteria) => Promise<string | undefined>
  findOne: (criteria: Criteria) => Promise<Item | undefined>
  findAll: (criteria: Criteria) => Promise<Item | undefined>
  delete: (criteria: Criteria) => Promise<void>
}

export interface Encrypted {
  salt: string,
  hash: string
}

export const modifiers = [
  'id',
  'createdBy',
  'createdAt',
  'updatedBy',
  'updatedAt'
]

export const enum Expression {
  EQUAL = 'equal',
  NOT_EQUAL = 'not equal'
}

export const enum Combinator {
  AND = 'and',
  OR = 'or'
}


export interface Predicate {
  column: string,
  expression?: Expression,
  value: string,
  combinator?: Combinator
}

export type Criteria = Predicate[]