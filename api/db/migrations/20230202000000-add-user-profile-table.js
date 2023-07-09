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
  return db.runSql('CREATE TABLE user_profile (id varchar(33) PRIMARY KEY' +
    ', username varchar(50) NOT NULL' +
    ', first_name varchar(50) NOT NULL' +
    ', last_name varchar(50) NOT NULL' +
    ', status varchar(50) NOT NULL' +
    ', email varchar(50) NOT NULL' +
    ', address json NOT NULL' +
    ', created_by varchar(50)' +
    ', created_at TIMESTAMP' +
    ', updated_by varchar(50)' +
    ', updated_at TIMESTAMP' +
    ')')
}

exports.down = function (db) {
  return db.runSql('DROP TABLE user')
}

exports._meta = {
  'version': 1
}
