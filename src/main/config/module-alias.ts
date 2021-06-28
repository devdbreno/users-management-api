import { join, resolve } from 'path'
import { addAliases } from 'module-alias'

export const rootSrcDir = resolve(__dirname, '../..')

addAliases({
  '@data': join(rootSrcDir, 'data'),
  '@main': join(rootSrcDir, 'main'),
  '@infra': join(rootSrcDir, 'infra'),
  '@domain': join(rootSrcDir, 'domain'),
  '@validation': join(rootSrcDir, 'validation'),
  '@presentation': join(rootSrcDir, 'presentation')
})
