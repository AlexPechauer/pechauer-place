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
  return db.runSql('CREATE TABLE auth (id varchar(33) PRIMARY KEY' +
    ', userId varchar(33) NOT NULL' +
    ', salt varchar(33) NOT NULL' +
    ', hash varchar(128) NOT NULL' +
    ', role smallint [] NOT NULL' +
    ')')
}

exports.down = function (db) {
  return db.runSql('DROP TABLE user')
}

exports._meta = {
  'version': 1
}
