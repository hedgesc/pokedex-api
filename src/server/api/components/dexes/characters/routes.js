import { Router } from 'express'
import dexCharacterMovesRouter from './moves/routes'
import controller from './controller'
import { characterIdMiddleware } from '../../../middleware/routes'

const router = Router()

router.get('/', controller.list)

router.use('/:id/moves', characterIdMiddleware, dexCharacterMovesRouter)

export default router