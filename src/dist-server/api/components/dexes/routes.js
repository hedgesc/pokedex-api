"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _routes = _interopRequireDefault(require("./games/routes"));

var _routes2 = _interopRequireDefault(require("./characters/routes"));

var _controller = _interopRequireDefault(require("./controller"));

var _routes3 = require("../../middleware/routes");

var router = (0, _express.Router)();
router.get('/', _controller["default"].list);
router.post('/', _controller["default"].create);
router.get('/:id', _controller["default"].get);
router.put('/:id', _controller["default"].update);
router["delete"]('/:id', _controller["default"].remove);
router.use('/:id/games', _routes3.dexIdMiddleware, _routes["default"]);
router.use('/:id/characters', _routes3.dexIdMiddleware, _routes2["default"]);
var _default = router;
exports["default"] = _default;