import store from './store'

const list = async (id) => {
  return await store.list(parseInt(id))
}

export default {
  list
}