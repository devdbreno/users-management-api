module.exports = {
  roots: ['<rootDir>/test'],
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  coverageProvider: 'babel',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@test/(.*)': '<rootDir>/test/$1',
    '@data/(.*)': '<rootDir>/src/data/$1',
    '@main/(.*)': '<rootDir>/src/main/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@validation/(.*)': '<rootDir>/src/validation/$1',
    '@presentation/(.*)': '<rootDir>/src/presentation/$1'
  }
}
