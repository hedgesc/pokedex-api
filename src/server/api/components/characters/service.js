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

const list = async (limit, offset) => {
  let results

  if(!limit && !offset) {
    results = await store.list()
  }
  else {
    limit = parseInt(limit) || 10
    offset = parseInt(offset) || 0
    results = await store.page(limit, offset)
  }
  
  return results
}

const update = async (id, model) => {
  const result = await store.update(parseInt(id), model)
  return { id: result }
}

export default {
  create,
  get,
  remove,
  list,
  update
}