import store from './store'

// const toCamel = (s) => {
//   return s.replace(/([-_][a-z])/ig, ($1) => {
//     return $1.toUpperCase()
//       .replace('-', '')
//       .replace('_', '');
//   });
// }

const create = async (model) => {
  return await store.create(model)
}

const get = async (id) => {
  return await store.get(parseInt(id))
}

const remove = async (id) => {
  const result = await store.remove(parseInt(id))
  return { id: result }
}

const list = async () => {
  return await store.list()
}

const update = async (id, model) => {
  const result = await store.update(parseInt(id), model)
  return { id: result }
}

const games = async (id) => {
  return await store.games(parseInt(id))
}

const characters = async (id) => {
  return await store.characters(parseInt(id))
}

export default {
  create,
  get,
  remove,
  list,
  update,
  games,
  characters
}