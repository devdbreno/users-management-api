import { anyObjectData } from '@main/config/app'
import { ServerError } from '@presentation/errors'
import { HttpResponse } from '@presentation/protocols'

export const ok = (data: anyObjectData): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: anyObjectData): HttpResponse => ({
  body: data,
  statusCode: 201
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
