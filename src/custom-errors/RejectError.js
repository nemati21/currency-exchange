class RejectError extends Error {
  constructor(code, message) {
    super('Request rejected');
    this.code = 1102;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = RejectError;
