import { join, resolve } from 'path'
import { addAliases } from 'module-alias'

const rootDir = resolve(__dirname, '../..')

addAliases({
  '@main': join(rootDir, 'main')
})
