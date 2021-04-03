const env = process.env.NODE_ENV || 'development' // 'development' or 'production'

// const config = require(`./${env.trim()}.js`).default

const development = {
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
}

const production = {
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
}

const config = {
  development,
  production
}

export default config[env]