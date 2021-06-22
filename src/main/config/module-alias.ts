import { join, resolve } from 'path'
import { addAliases } from 'module-alias'

const rootDir = resolve(__dirname, '../..')

addAliases({
  '@main': join(rootDir, 'main'),
  '@infra': join(rootDir, 'infra'),
  '@presentation': join(rootDir, 'presentation')
})
