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
  return db.runSql(`INSERT INTO user_role (id, role, permission)
  VALUES (0, 'superAdmin', '*' )
  , (1, 'admin', '*' )
  , (2, 'superUser', '*' )
  , (3, 'user', '*' )
  , (4, 'guest', '*' );

  INSERT INTO branch(id, profile)
  VALUES ('branch_id_1', '{"name" : "A-Town Branch"}')
  , ('branch_id_2', '{"name" : "Tucson Branch"}')
  , ('branch_id_3', '{"name" : "Traveling Branch"}');

  INSERT INTO user_profile (id, branch_id, username, first_name, last_name, address, status, email)
  VALUES ('1fe638b84d0683edc8b55588b28de60f', 'branch_id_1', 'apech', 'alex', 'pechauer', '{
        "street": "some street",
        "city": "some city",
        "zipCode": "60002",
        "country": "USA"
    }', 'active', 'someemail@gmail.com');

  INSERT INTO auth (id, user_id, salt, hash, roles)
  VALUES('b14094329710a257afe09ebee2b20c28', '1fe638b84d0683edc8b55588b28de60f', 'e5adb2024d3953d856901a081e4cdf0c', '6679e95b37770f636e31a3f915ed2107e8b2d89c6525ab322f27de7f0d96d9f25034cce0e7f5828686deace2127d0ff7521f87976c496ef1ef3b2d3363029c58', '{1}');

  INSERT INTO guestbook(id, branch_id)
  VALUES ('guestbook_id_1', 'branch_id_1');

  INSERT INTO guestbook_entry(id, guestbook_id, name, title, message)
  VALUES('guestbook_entry_id_1', 'guestbook_id_1', 'Otis P', 'Stays every night', 'I am a bum and stay here every night for free!');

  INSERT INTO blog_type(id, type)
  VALUES(0, 'general')
  , (1, 'movie');

  INSERT INTO blog(id, user_id, blog_type_id)
  VALUES('blog_id_1', '1fe638b84d0683edc8b55588b28de60f', 0);

  INSERT INTO blog_entry(id, blog_id, content)
  VALUES('blog_entry_id_1', 'blog_id_1', '{"title": "First blog entry!"}');

  INSERT INTO blog_comment(id, blog_entry_id, user_id, message)
  VALUES('blog_comment_id_1', 'blog_entry_id_1', '1fe638b84d0683edc8b55588b28de60f', 'This is my first comment!');`
  )
}

exports.down = function (db) { }

exports._meta = {
  'version': 1
}