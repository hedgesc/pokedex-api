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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(game) {
    var sql, values, res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sql = 'INSERT INTO dex_games \
  (dex_id, name, name_id, regions) \
  VALUES ($1, $2, $3, $4) RETURNING game_id';
            values = [game.dex_id, game.name, game.name_id, game.regions];
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
            sql = 'SELECT * FROM dex_games WHERE game_id = $1';
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
            sql = 'DELETE FROM dex_games WHERE game_id = $1';
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
            sql = 'SELECT * FROM dex_games ORDER BY dex_id, game_id';
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

var update = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, game) {
    var sql, values;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            sql = 'UPDATE dex_games \
  SET dex_id = $2, name = $3, name_id = $4, regions = $5 \
  WHERE game_id = $1';
            values = [id, game.dex_id, game.name, game.name_id, game.regions];
            _context5.next = 4;
            return pool.query(sql, values);

          case 4:
            return _context5.abrupt("return", id);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function update(_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();

var _default = {
  create: create,
  get: get,
  remove: remove,
  list: list,
  update: update
};
exports["default"] = _default;