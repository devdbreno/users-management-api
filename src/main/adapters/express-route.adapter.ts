import { Controller } from '@presentation/protocols'

import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response): Promise<void> => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      userId: req.userId
    }

    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
