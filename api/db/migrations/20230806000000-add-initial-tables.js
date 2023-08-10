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
  return db.runSql(`CREATE TABLE user_profile (id varchar(33) PRIMARY KEY
  , username varchar(50) NOT NULL
  , first_name varchar(50) NOT NULL
  , last_name varchar(50) NOT NULL
  , address json NOT NULL
  , status varchar(50) NOT NULL
  , email varchar(50) NOT NULL
  , created_by varchar(50)
  , created_at TIMESTAMP
  , updated_by varchar(50)
  , updated_at TIMESTAMP
  );

  CREATE INDEX idx_user_profile_username ON user_profile(username);
  CREATE INDEX idx_user_profile_email ON user_profile(email);

  CREATE TABLE user_role (id smallint PRIMARY KEY
  , role varchar(33) NOT NULL
  , permission varchar(33) NOT NULL
  );
  
  CREATE TABLE auth (id varchar(33) PRIMARY KEY
  , user_id varchar(33) NOT NULL REFERENCES user_profile(id) ON DELETE CASCADE
  , salt varchar(33) NOT NULL
  , hash varchar(128) NOT NULL
  , roles smallint [] NOT NULL
  );
  
  CREATE TABLE guestbook (id varchar(33) PRIMARY KEY
  , first_name varchar(50) NULL
  , title varchar(50) NOT NULL
  , message varchar(280) NOT NULL
  , created_by varchar(50)
  , created_at TIMESTAMP
  , updated_by varchar(50)
  , updated_at TIMESTAMP
  );

  CREATE TABLE blog_type (id smallint PRIMARY KEY
  , type varchar(33) NOT NULL
  );

  CREATE TABLE blog (id varchar(33) PRIMARY KEY
  , user_id varchar(50) NOT NULL REFERENCES user_profile(id) ON DELETE CASCADE
  , blog_type_id smallint NOT NULL REFERENCES blog_type(id) ON DELETE CASCADE
  , content json NOT NULL
  , created_by varchar(50)
  , created_at TIMESTAMP
  , updated_by varchar(50)
  , updated_at TIMESTAMP
  );

  CREATE TABLE blog_comment(id varchar(33) PRIMARY KEY
  , user_id varchar(50) NOT NULL REFERENCES user_profile(id) ON DELETE CASCADE
  , message varchar(280) NOT NULL
  );`)
}

exports.down = function (db) {
  return db.runSql(`DROP TABLE IF EXISTS user_profile CASCADE;
	DROP TABLE IF EXISTS auth;
	DROP TABLE IF EXISTS guestbook;
	DROP TABLE IF EXISTS user_role;
	DROP TABLE IF EXISTS blog_type CASCADE;
	DROP TABLE IF EXISTS blog CASCADE;
	DROP TABLE IF EXISTS blog_comment;
  `)
}

exports._meta = {
  'version': 1
}
