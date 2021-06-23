import { cors, bodyParser, contentType } from '@main/middlewares'

import { Express } from 'express'

export default (app: Express): void => {
  app.use(cors)
  app.use(bodyParser)
  app.use(contentType)
}
