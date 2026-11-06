import service from './service'
import asyncHandler from '../../../middleware/asyncHandler'

const list = async (req, res) => {
  const result = await service.list(req.dexId)
  res.status(200).json(result)
}

export default {
  list: asyncHandler(list)
}