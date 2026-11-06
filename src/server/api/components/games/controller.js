import service from './service'
import asyncHandler from '../../middleware/asyncHandler'

const resource = 'Game'

const notFound = (res) => {
  res.status(404).json({ error: 'Not found' })
}

const list = async (req, res) => {
  const result = await service.list()
  res.status(200).json(result)
}

const get = async (req, res) => {
  const json = await service.get(req.params.id)
  if (!json) {
    notFound(res)
    return
  }
  res.status(200).json(json)
}

const create = async (req, res) => {
  const result = await service.create(req.body)
  res.status(201).send(`${resource} ${result.id} created`)
}

const update = async (req, res) => {
  const result = await service.update(req.params.id, req.body)
  if (!result) {
    notFound(res)
    return
  }
  res.status(200).send(`${resource} ${result.id} updated`)
}

const remove = async (req, res) => {
  const result = await service.remove(req.params.id)
  if (!result) {
    notFound(res)
    return
  }
  res.status(200).send(`${resource} ${result.id} deleted`)
}

export default {
  list: asyncHandler(list),
  create: asyncHandler(create),
  get: asyncHandler(get),
  update: asyncHandler(update),
  remove: asyncHandler(remove)
}
