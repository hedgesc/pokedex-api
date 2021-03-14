"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pg = require("pg");

var _config = _interopRequireDefault(require("../../../config/config"));

var _lodash = _interopRequireDefault(require("lodash"));

var pool = new _pg.Pool(_config["default"].postgres);

var create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(character) {
    var sql, values, res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sql = 'INSERT INTO characters \
  (pokemon_id, name, name_id, hp, attack, defense, speed, total, \
  special_attack, special_defense, image_url, evolves_from_id, gen, \
  types, abilities) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, \
  $10, $11, $12, $13, $14, $15) RETURNING character_id';
            values = [character.pokemon_id, character.name, character.name_id, character.hp, character.attack, character.defense, character.speed, character.total, character.special_attack, character.special_defense, character.image_url, character.evolves_from_id, character.gen, character.types, character.abilities];
            _context.next = 4;
            return pool.query(sql, values);

          case 4:
            res = _context.sent;
            return _context.abrupt("return", res.rows[0]);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function create(_x) {
    return _ref.apply(this, arguments);
  };
}();

var get = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var sql, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sql = 'SELECT * FROM characters WHERE character_id = $1';
            _context2.next = 3;
            return pool.query(sql, [id]);

          case 3:
            res = _context2.sent;
            return _context2.abrupt("return", res.rows[0]);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function get(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var remove = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var sql;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            sql = 'DELETE FROM characters WHERE character_id = $1';
            _context3.next = 3;
            return pool.query(sql, [id]);

          case 3:
            return _context3.abrupt("return", id);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function remove(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var list = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var sql, results;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            sql = 'SELECT character_id, name, image_url FROM characters ORDER BY character_id';
            _context4.next = 3;
            return pool.query(sql);

          case 3:
            results = _context4.sent;
            return _context4.abrupt("return", results.rows);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function list() {
    return _ref4.apply(this, arguments);
  };
}();

var page = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(limit, offset) {
    var last_row, sql, results, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            last_row = limit + offset;
            sql = 'WITH cte AS (SELECT * FROM characters) \
  SELECT * FROM (TABLE cte ORDER BY character_id ASC LIMIT $1 OFFSET $2) sub \
  RIGHT JOIN (SELECT count(*) FROM cte) c(total_count) ON true;';
            _context5.next = 4;
            return pool.query(sql, [limit, offset]);

          case 4:
            results = _context5.sent;
            result = {
              items: [],
              total_count: 0,
              has_more: false
            };

            if (results.rows.length > 0) {
              result.total_count = parseInt(results.rows[0]['total_count']);
              result.items = _lodash["default"].map(results.rows, function (obj) {
                return _lodash["default"].omit(obj, ['total_count']);
              });
              result.has_more = result.total_count > last_row;
            }

            return _context5.abrupt("return", result);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function page(_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, character) {
    var sql, values;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            sql = 'UPDATE characters \
  SET name_id = $2, name = $3, hp = $4, attack = $5, defense = $6, \
  special_attack = $7, special_defense = $8, speed = $9, total = $10, \
  image_url = $11, evolves_from_id = $12, gen = $13, types = $14 \
  abilities = $15, pokemon_id = $16 \
  WHERE character_id = $1';
            values = [id, character.name_id, character.name, character.hp, character.attack, character.defense, character.special_attack, character.special_defense, character.speed, character.total, character.image_url, character.evolves_from_id, character.gen, character.types, character.abilities, character.pokemon_id];
            _context6.next = 4;
            return pool.query(sql, values);

          case 4:
            return _context6.abrupt("return", id);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function update(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();

var _default = {
  create: create,
  get: get,
  remove: remove,
  list: list,
  page: page,
  update: update
};
exports["default"] = _default;