import { Criteria, Encrypted, Expression, Predicate } from './domain'
import * as Crypto from 'crypto'

export const hex = (): string => { return Crypto.randomBytes(33).toString('hex').substring(0, 32) }
export const hasher = (value: string, salt: string): string => { return Crypto.pbkdf2Sync(value, salt, 1000, 64, `sha512`).toString(`hex`) }

export const encrypt = (value: string): Encrypted => {
  const salt = hex()
  const hash = hasher(value, salt)
  return { salt, hash }
}

export const createId = (): string => { return hex() }

export const camelToSnake = (x: string): string => x.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()

export const snakeToCamel = (x: string): string => x.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())

export const columnNamesGenerator = (object: Object): string[] => Object.keys(object).map(key => camelToSnake(key))

export const objectNamesGenerator = (object: Record<string, any>): Object => Object.keys(object).reduce((camelCaseObj, key) => ({ ...camelCaseObj, [snakeToCamel(key)]: object[key] }), {});

export const valuesGenerator = (object: Object): string[] => Object.values(object)

export const dollarSignValuesGenerator = (object: Object): string[] => Array.from({ length: Object.keys(object).length }, (_, index) => '$' + (index + 1).toString())

export const genColsDolsVals = (object: Object): Record<string, string[]> => {
  return {
    columns: columnNamesGenerator(object),
    dollars: dollarSignValuesGenerator(object),
    values: valuesGenerator(object)
  }
}

const sqlExpression = (expression?: Expression) => expression == undefined || expression == Expression.EQUAL ? '=' : '!='

const ingestCriteria = (criteria: Criteria, sqlStatement: string, iteration: number): string => {
  const length = criteria.length
  if (length > 0) {
    const predicate = criteria.shift()
    sqlStatement = `${sqlStatement} ${camelToSnake((predicate as Predicate).column)} ${sqlExpression(predicate?.expression)} $${iteration}`
    if (length > 1) {
      sqlStatement = `${sqlStatement} ${predicate?.combinator == undefined ? 'AND' : predicate?.combinator}`
    }
    return ingestCriteria(criteria, sqlStatement, ++iteration)
  }

  return sqlStatement
}

export const whereStatementBuilder = (criteria: Criteria): string => {
  return ingestCriteria(criteria, 'WHERE', 1)
} 