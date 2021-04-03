import service from './service'

const list = async (req, res) => {
  const result = await service.list(req.dexId, req.characterId)
  res.status(200).json(result)
}

export default {
  list
}