"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.characterIdMiddleware = exports.dexIdMiddleware = void 0;

var dexIdMiddleware = function dexIdMiddleware(req, res, next) {
  console.log('dexId:middleware:', req.params);
  req.dexId = req.params.id;
  next();
};

exports.dexIdMiddleware = dexIdMiddleware;

var characterIdMiddleware = function characterIdMiddleware(req, res, next) {
  console.log('characterId:middleware:', req.params);
  req.characterId = req.params.characterId;
  next();
};

exports.characterIdMiddleware = characterIdMiddleware;