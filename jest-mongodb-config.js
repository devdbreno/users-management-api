module.exports = {
  mongodbMemoryServer: {
    version: 'latest'
  },
  mongodbMemoryServerOptions: {
    autoStart: false,
    instance: { dbName: 'hivelabsjest' },
    binary: { version: 'latest', skipMD5: true }
  }
}
