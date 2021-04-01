import { Router } from 'express'
import dexCharacterMovesRouter from './moves/routes'
import controller from './controller'

const router = Router()

router.get('/', controller.list)

router.use(':id/moves', dexCharacterMovesRouter)

export default router