import { Router } from 'express'
import dexGamesRouter from './games/routes'
import dexCharactersRouter from './characters/routes'
import controller from './controller'
import { dexIdMiddleware } from '../../middleware/routes'

const router = Router()

router.get('/', controller.list)
router.post('/', controller.create)
router.get('/:id', controller.get)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)

router.use(':id/games', dexIdMiddleware, dexGamesRouter)

router.use('/:id/characters', dexIdMiddleware, dexCharactersRouter)

export default router