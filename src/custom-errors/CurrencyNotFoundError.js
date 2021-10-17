class CurrencyNotFoundError extends Error {
  constructor(code, message) {
    super('Currency price not found');
    this.code = 1103;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = CurrencyNotFoundError;
