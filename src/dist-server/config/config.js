"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var env = process.env.NODE_ENV || 'development'; // 'development' or 'production'
// const config = require(`./${env.trim()}.js`).default

var development = {
  app: {
    "port": 3416
  },
  db: {
    "user": "postgres",
    "password": "Super*32",
    "database": "pokemondb",
    "host": "127.0.0.1",
    "port": "5432"
  }
};
var production = {
  app: {
    "port": 3416
  },
  db: {
    "user": "postgres",
    "password": "Super*32",
    "database": "pokemondb",
    "host": "127.0.0.1",
    "port": "5432"
  }
};
var config = {
  development: development,
  production: production
};
var _default = config[env];
exports["default"] = _default;