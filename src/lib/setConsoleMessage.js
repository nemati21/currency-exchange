function setConsoleMessage(message, status) {
  const s = ' '.repeat(7 - status.length);
  return `[ ${status}${s} ] ${message}`;
}

module.exports = setConsoleMessage;
