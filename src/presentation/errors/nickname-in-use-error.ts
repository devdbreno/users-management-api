export class NicknameInUseError extends Error {
  constructor(stack?: string) {
    super('Nickname is already in use')
    this.name = 'NicknameInUseError'
    this.stack = stack
  }
}
