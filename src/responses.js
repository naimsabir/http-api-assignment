const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  console.log(acceptedTypes);
  const daResponse = {
    message: 'This response be bussin',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${daResponse.message}</message>`;
    xmlString += '</response>';
    return respond(request, response, 200, xmlString, 'text/xml');
  }

  return respond(request, response, 200, JSON.stringify(daResponse), 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  const daResponse = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    if (acceptedTypes[0] === 'text/xml') {
      daResponse.message = 'Missing valid query parameter set to true';
      daResponse.id = 'badRequest';

      let xmlString = '<response>';
      xmlString += `<message>${daResponse.message}</message>`;
      xmlString += `<id>${daResponse.id}</id>`;
      xmlString += '</response>';
      return respond(request, response, 400, xmlString, 'text/xml');
    }
    daResponse.message = 'Missing valid query parameter set to true';
    daResponse.id = 'badRequest';
    return respond(request, response, 400, JSON.stringify(daResponse), 'application/json');
  }
  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${daResponse.message}</message>`;
    xmlString += '</response>';
    return respond(request, response, 200, xmlString, 'text/xml');
  }
  return respond(request, response, 200, JSON.stringify(daResponse), 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const daResponse = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    if (acceptedTypes[0] === 'text/xml') {
      daResponse.message = 'Missing valid query parameter set to true';
      daResponse.id = 'unauthorized';

      let xmlString = '<response>';
      xmlString += `<message>${daResponse.message}</message>`;
      xmlString += `<id>${daResponse.id}</id>`;
      xmlString += '</response>';
      return respond(request, response, 401, xmlString, 'text/xml');
    }
    daResponse.message = 'Missing valid query parameter set to true';
    daResponse.id = 'unauthorized';
    return respond(request, response, 401, JSON.stringify(daResponse), 'application/json');
  }
  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${daResponse.message}</message>`;
    xmlString += '</response>';
    return respond(request, response, 200, xmlString, 'text/xml');
  }
  return respond(request, response, 200, JSON.stringify(daResponse), 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  console.log(acceptedTypes);
  const daResponse = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${daResponse.message}</message>`;
    xmlString += `<id>${daResponse.id}</id>`;
    xmlString += '</response>';
    return respond(request, response, 403, xmlString, 'text/xml');
  }

  return respond(request, response, 403, JSON.stringify(daResponse), 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  console.log(acceptedTypes);
  const daResponse = {
    message: 'Internal Server Error. This is an L',
    id: 'internal',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${daResponse.message}</message>`;
    xmlString += `<id>${daResponse.id}</id>`;
    xmlString += '</response>';
    return respond(request, response, 500, xmlString, 'text/xml');
  }

  return respond(request, response, 500, JSON.stringify(daResponse), 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  console.log(acceptedTypes);
  const daResponse = {
    message: 'A GET request for this page has not yet been implemented yet. Check later for updated content',
    id: 'not implemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${daResponse.message}</message>`;
    xmlString += `<id>${daResponse.id}</id>`;
    xmlString += '</response>';
    return respond(request, response, 501, xmlString, 'text/xml');
  }

  return respond(request, response, 501, JSON.stringify(daResponse), 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const daResponse = {
    message: 'The page you are looking for was not found. Major L',
    id: 'notFound',
  };
  if (acceptedTypes[0] === 'text/xml') {
    let xmlString = '<response>';
    xmlString += `<message>${daResponse.message}</message>`;
    xmlString += `<id>${daResponse.id}</id>`;
    xmlString += '</response>';

    return respond(request, response, 404, xmlString, 'text/xml');
  }
  return respond(request, response, 404, JSON.stringify(daResponse), 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
