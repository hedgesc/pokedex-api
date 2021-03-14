"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controller = _interopRequireDefault(require("./controller"));

var router = (0, _express.Router)();
router.get('/', _controller["default"].list);
router.post('/', _controller["default"].create);
router.get('/:id', _controller["default"].get);
router.put('/:id', _controller["default"].update);
router["delete"]('/:id', _controller["default"].remove);
router.get('/:id/games', _controller["default"].games);
router.get('/:id/characters', _controller["default"].characters);
var _default = router;
exports["default"] = _default;