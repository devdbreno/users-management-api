import { join, resolve } from 'path'
import { addAliases } from 'module-alias'

export const rootDir = resolve(__dirname, '../../..')

addAliases({
  '@main': join(rootDir, 'src/main'),
  '@infra': join(rootDir, 'src/infra'),
  '@domain': join(rootDir, 'src/domain'),
  '@presentation': join(rootDir, 'src/presentation')
})
