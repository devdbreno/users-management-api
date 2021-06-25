import { anyData } from '@main/config/app'

import { ServerError } from '@presentation/errors'
import { HttpResponse } from '@presentation/protocols'

export const ok = (data: anyData): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = <T>(data: T): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
