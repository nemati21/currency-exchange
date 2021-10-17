class InternalError extends Error {
  constructor(code, message) {
    super('Internal error');
    this.code = 1101;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = InternalError;
