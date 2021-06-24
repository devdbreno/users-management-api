import { join, resolve } from 'path'
import { addAliases } from 'module-alias'

export const rootDir = resolve(__dirname, '../../..')

addAliases({
  '@data': join(rootDir, 'src/data'),
  '@main': join(rootDir, 'src/main'),
  '@infra': join(rootDir, 'src/infra'),
  '@domain': join(rootDir, 'src/domain'),
  '@validation': join(rootDir, 'src/validation'),
  '@presentation': join(rootDir, 'src/presentation')
})
