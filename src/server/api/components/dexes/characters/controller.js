import service from './service'

const list = async (req, res) => {
  const result = await service.list(req.dexId)
  res.status(200).json(result)
}

export default {
  list
}