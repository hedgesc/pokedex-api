"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _routes = _interopRequireDefault(require("./moves/routes"));

var _controller = _interopRequireDefault(require("./controller"));

var _routes2 = require("../../../middleware/routes");

var router = (0, _express.Router)();
router.get('/', _controller["default"].list);
router.use('/:id/moves', _routes2.characterIdMiddleware, _routes["default"]);
var _default = router;
exports["default"] = _default;