const setError = (err, res) => {
  let code;
  let payload = '';

  if (typeof err === 'number') {
    code = err;
    payload = {
      code: 404,
      message: 'Not found',
    };
  } else if (err.validation) {
    code = 400;
    payload = {
      code: 1199,
      message: 'Invalid request',
    };
  } else if (err.statusCode === 400) {
    code = 400;
    payload = {
      code: 1199,
      message: 'Invalid request',
    };
  } else if (!err.code && err.error && err.error.code) {
    code = 406;
    payload = {
      code: 1102,
      message: 'Request rejected',
    };
    if (err.error.code) {
      payload.providerCode = err.error.code;
      payload.providerMessage = err.error.message;
    }
    if (err.error.providerCode) payload.providerMessage = `${err.error.providerCode}:${err.error.providerMessage}`;
  } else if (!err.code || Number.isNaN(Number(err.code))) {
    code = 500;
    payload = {
      code: 1101,
      message: 'Internal error',
    };
  } else if (err.code && err.code === 1102) {
    code = 406;
    payload = {
      code: err.code,
      message: err.message,
    };
  } else {
    code = 400;
    payload = {
      code: err.code,
      message: err.message,
    };
  }

  if (err.originCode) payload.providerCode = err.originCode;
  if (err.originMessage) payload.providerMessage = err.originMessage;
  if (err.referenceId) payload.referenceId = err.referenceId;

  res.code(code).send(payload);
};

module.exports = setError;
