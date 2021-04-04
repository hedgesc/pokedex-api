"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.characterIdMiddleware = exports.dexIdMiddleware = void 0;

var dexIdMiddleware = function dexIdMiddleware(req, res, next) {
  req.dexId = req.params.id;
  next();
};

exports.dexIdMiddleware = dexIdMiddleware;

var characterIdMiddleware = function characterIdMiddleware(req, res, next) {
  req.characterId = req.params.id;
  next();
};

exports.characterIdMiddleware = characterIdMiddleware;