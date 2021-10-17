class InvalidCurrencyPriceError extends Error {
  constructor(code, message) {
    super('Currency price is invalid');
    this.code = 1104;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = InvalidCurrencyPriceError;
