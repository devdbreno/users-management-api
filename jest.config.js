module.exports = {
  roots: ['<rootDir>/test'],
  preset: 'ts-jest',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  moduleNameMapper: {
    '@test/(.*)': '<rootDir>/test/$1',
    '@main/(.*)': '<rootDir>/src/main/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1'
  },
  coverageProvider: 'babel',
  coverageDirectory: 'coverage'
}
