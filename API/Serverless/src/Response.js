const headers = {
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
};

const buildError = (statusCode) => (msg) => {
  const resp = {
    headers,
    statusCode,
    body: JSON.stringify({
      statusCode,
      msg
    })
  };
  return resp;
};

const build = (statusCode) => (body) => {
  const res = {
    headers,
    statusCode,
    body: body !== undefined ? JSON.stringify(body) : ''
  };

  return res;
};

const badRequest = buildError(400);
const notFound = buildError(404);
const success = build(200);
const created = build(201);
const failure = build(500);

module.exports = {
  badRequest,
  success,
  created,
  failure,
  notFound
};

