const http = require('http'); // http module
const url = require('url'); // url module

const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const responses = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': responses.success,
  '/style.css': htmlHandler.getCSS,
  '/badRequest': responses.badRequest,
  '/unauthorized': responses.unauthorized,
  '/forbidden': responses.forbidden,
  '/internal': responses.internal,
  '/notImplemented': responses.notImplemented,
  notFound: responses.notFound,
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);

  const params = query.parse(parsedURL.query);

  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
