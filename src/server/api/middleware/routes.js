const dexIdMiddleware = (req, res, next) => {
  console.log('dexId:middleware:', req.params)
  req.dexId = req.params.id;
  next()
}

const characterIdMiddleware = (req, res, next) => {
  console.log('characterId:middleware:', req.params)
  req.characterId = req.params.characterId
  next()
}

export {
  dexIdMiddleware,
  characterIdMiddleware
}