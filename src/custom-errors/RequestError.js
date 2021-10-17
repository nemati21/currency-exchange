class RequestError extends Error {
  constructor(code, message) {
    super('Invalid request');
    this.code = 1199;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = RequestError;
