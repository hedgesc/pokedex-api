const dexIdMiddleware = (req, res, next) => {
  req.dexId = req.params.id;
  next()
}

const characterIdMiddleware = (req, res, next) => {
  req.characterId = req.params.id
  next()
}

export {
  dexIdMiddleware,
  characterIdMiddleware
}