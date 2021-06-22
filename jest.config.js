module.exports = {
  roots: ['<rootDir>/test'],
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  moduleNameMapper: {
    '@test/(.*)': '<rootDir>/test/$1',
    '@main/(.*)': '<rootDir>/src/main/$1'
  },
  coverageProvider: 'babel',
  coverageDirectory: 'coverage'
}
