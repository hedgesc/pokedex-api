"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pg = require("pg");

var _config = _interopRequireDefault(require("../../../../config/config"));

var _lodash = _interopRequireDefault(require("lodash"));

var pool = new _pg.Pool(_config["default"].db);

var list = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var sql, res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sql = 'SELECT * FROM dex_games WHERE dex_id = $1';
            _context.next = 3;
            return pool.query(sql, [id]);

          case 3:
            res = _context.sent;
            return _context.abrupt("return", res.rows);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function list(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  list: list
};
exports["default"] = _default;