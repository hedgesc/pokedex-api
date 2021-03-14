"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _config = _interopRequireDefault(require("./config/config"));

var _routes = _interopRequireDefault(require("./api/components/characters/routes"));

var _routes2 = _interopRequireDefault(require("./api/components/dexes/routes"));

var _routes3 = _interopRequireDefault(require("./api/components/moves/routes"));

var _routes4 = _interopRequireDefault(require("./api/components/games/routes"));

var app = (0, _express["default"])();
exports.app = app;
app.use((0, _cors["default"])()); // Configure bodyparser to handle post requests

app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use('/api/v1/characters', _routes["default"]);
app.use('/api/v1/dexes', _routes2["default"]);
app.use('/api/v1/moves', _routes3["default"]);
app.use('/api/v1/games', _routes4["default"]); // launch server on specified port

app.listen(_config["default"].port, function () {
  console.log("Running Pokedex API on port " + _config["default"].port);
});