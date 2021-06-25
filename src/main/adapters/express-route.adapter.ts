import { Controller } from '@presentation/protocols'

import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response): Promise<void> => {
    const request = {
      ...(req.body || {}),
      ...(req.query || {}),
      ...(req.params || {}),

      userNickname: req.userNickname
    }

    const { statusCode, body } = await controller.handle(request)

    if (statusCode >= 200 && statusCode <= 299) res.status(statusCode).json(body)
    else res.status(statusCode).json({ error: body.message })
  }
}
