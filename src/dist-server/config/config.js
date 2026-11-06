"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var env = process.env.NODE_ENV; // 'development' or 'production'

var password = process.env.PGPASSWORD;

if (!password) {
  throw new Error('PGPASSWORD environment variable is required');
}

var development = {
  app: {
    "port": 3416
  },
  db: {
    "user": "postgres",
    "password": password,
    "database": "pokemondb",
    "host": "127.0.0.1",
    "port": "5432"
  }
};
var docker = {
  app: {
    "port": 3416
  },
  db: {
    "user": "postgres",
    "password": password,
    "database": "pokemondb",
    "host": "postgres",
    "port": "5432"
  }
};
var production = {
  app: {
    "port": 3416
  },
  db: {
    "user": "postgres",
    "password": password,
    "database": "pokemondb",
    "host": "postgres",
    "port": "5432"
  }
};
var config = {
  development: development,
  docker: docker,
  production: production
};
var _default = config[env];
exports["default"] = _default;