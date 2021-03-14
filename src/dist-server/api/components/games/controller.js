"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _service = _interopRequireDefault(require("./service"));

var resource = 'Game';

var list = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _service["default"].list();

          case 2:
            result = _context.sent;
            res.status(200).json(result);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function list(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var get = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var json;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _service["default"].get(req.params.id);

          case 2:
            json = _context2.sent;
            res.status(200).json(json);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function get(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var create = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _service["default"].create(req.body);

          case 2:
            result = _context3.sent;
            res.status(201).send("".concat(resource, " ").concat(result.id, " created"));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function create(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _service["default"].update(req.params.id, req.body);

          case 2:
            result = _context4.sent;
            res.status(200).send("".concat(resource, " ").concat(result.id, " updated"));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function update(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var remove = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _service["default"].remove(req.params.id);

          case 2:
            result = _context5.sent;
            res.status(200).send("".concat(resource, " ").concat(result.id, " deleted"));

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function remove(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var _default = {
  list: list,
  create: create,
  get: get,
  update: update,
  remove: remove
};
exports["default"] = _default;