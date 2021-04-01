import service from './service'

const resource = 'Dex'

const list = async (req, res) => {
  const result = await service.list()
  res.status(200).json(result)
}

const get = async (req, res) => {
  const json = await service.get(req.params.id)
  res.status(200).json(json)
}

const create = async (req, res) => {
  const result = await service.create(req.body)
  res.status(201).send(`${resource} ${result.id} created`)
}

const update = async (req, res) => {
  const result = await service.update(req.params.id, req.body)
  res.status(200).send(`${resource} ${result.id} updated`)
}

const remove = async (req, res) => {
  const result = await service.remove(req.params.id)
  res.status(200).send(`${resource} ${result.id} deleted`)
}

export default {
  list,
  create,
  get,
  update,
  remove
}