import { Request, Response, NextFunction } from 'express'

export const noCache = (req: Request, res: Response, next: NextFunction): void => {
  res.set('expires', '0')
  res.set('pragma', 'no-cache')
  res.set('surrogate-control', 'no-store')
  res.set('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')

  next()
}
