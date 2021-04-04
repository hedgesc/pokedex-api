const env = process.env.NODE_ENV // 'development' or 'production'

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

const docker = {
  app: {
    "port": 3416
  },
  db: {
    "user": "postgres",
    "password": "Super*32",
    "database": "pokemondb",
    "host": "postgres",
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
    "host": "postgres",
    "port": "5432"
  }
}

const config = {
  development,
  docker,
  production
}

export default config[env]