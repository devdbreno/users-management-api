import { HttpResponse } from '@presentation/protocols'

export const execClientError = ({ applyError, buildError }: any): HttpResponse => applyError(buildError())

export const buildClientError = (error: any, applyError: (error: Error) => HttpResponse): BuildClientErrorReturn => ({
  clientError: {
    applyError,
    buildError: () => new error()
  }
})

export type BuildClientErrorReturn = {
  clientError: {
    applyError: (error: Error) => HttpResponse
    buildError: () => Error
  }
}
