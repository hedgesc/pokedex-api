import { Router } from 'express'
import controller from './controller'

const router = Router()

router.get('/', controller.list)
router.post('/', controller.create)
router.get('/:id', controller.get)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)
router.get('/:id/games', controller.games)
router.get('/:id/characters', controller.characters)

export default router