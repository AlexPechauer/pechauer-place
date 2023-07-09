'use strict'

var dbm
var type
var seed

// this.hex() = function () { return Crypto.randomBytes(33).toString('hex').substring(0, 32); }

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedlink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedlink
}

exports.up = function (db) {
  return db.runSql(`INSERT INTO user_role (id, role, permission) VALUES` +
    ` (0, 'superAdmin', '*' )` +
    `, (1, 'admin', '*' )` +
    `, (2, 'superUser', '*' )` +
    `, (3, 'user', '*' )` +
    `, (4, 'guest', '*' )`
  )
}

exports.down = function (db) { }

exports._meta = {
  'version': 1
}