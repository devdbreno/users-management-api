import { Middleware } from '@presentation/protocols'

import { Request, Response, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      ...(req.body || {}),
      ...(req.query || {}),
      ...(req.headers || {})
    }

    const { body, statusCode } = await middleware.handle(request)

    if (statusCode === 200) {
      Object.assign(req, body)
      next()
    } else
      res.status(statusCode).json({
        error: body.message
      })
  }
}
