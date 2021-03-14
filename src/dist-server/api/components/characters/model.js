"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Character = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Character = function Character() {
  (0, _classCallCheck2["default"])(this, Character);
  (0, _defineProperty2["default"])(this, "characterId", void 0);
  (0, _defineProperty2["default"])(this, "pokemonId", void 0);
  (0, _defineProperty2["default"])(this, "name", void 0);
  (0, _defineProperty2["default"])(this, "nameId", void 0);
  (0, _defineProperty2["default"])(this, "imageUrl", void 0);
  (0, _defineProperty2["default"])(this, "types", void 0);
  (0, _defineProperty2["default"])(this, "abilities", void 0);
  (0, _defineProperty2["default"])(this, "gen", void 0);
  (0, _defineProperty2["default"])(this, "evolvesFromId", void 0);
  (0, _defineProperty2["default"])(this, "hp", void 0);
  (0, _defineProperty2["default"])(this, "attack", void 0);
  (0, _defineProperty2["default"])(this, "defense", void 0);
  (0, _defineProperty2["default"])(this, "specialAttack", void 0);
  (0, _defineProperty2["default"])(this, "specialDefense", void 0);
  (0, _defineProperty2["default"])(this, "speed", void 0);
  (0, _defineProperty2["default"])(this, "total", void 0);
};

exports.Character = Character;