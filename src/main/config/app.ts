import express from 'express'

import initRoutes from '@main/config/routes'
import initMiddlewares from '@main/config/middlewares'

const app = express()

initMiddlewares(app)
initRoutes(app)

export default app
