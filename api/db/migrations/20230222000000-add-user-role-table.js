'use strict'

var dbm
var type
var seed

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
  return db.runSql('CREATE TABLE user_role (id smallint PRIMARY KEY' +
    ', role varchar(33) NOT NULL' +
    ', permission varchar(33) NOT NULL' +
    ')')
}

exports.down = function (db) {
  return db.runSql('DROP TABLE user_role')
}

exports._meta = {
  'version': 1
}
