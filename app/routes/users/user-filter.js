function isValidContent(value) {
  return value !== undefined && value !== "" && value !== null;
}

const filterQueryParameters = (logger, request) => {
  const filter = {};

  const query = request.query;

  if (isValidContent(query.CompanyId)) {
    filter.CompanyId = JSON.parse(query.CompanyId);
  }

  if (isValidContent(query.email)) {
    filter.email = query.email;
  }

  logger.debug(`Filtering query Parameters: ${JSON.stringify(filter)}`);

  return filter;
};

const getPathParamId = (logger, request) => {
  const id = request.params.id;

  logger.debug(`Getting PathParam ID: ${id}`);

  return id;
};

const getBody = (logger, request) => {
  const body = request.body;

  logger.debug(`Getting Body : ${body}`);

  return body;
};

module.exports = {
  filterQueryParameters,
  getPathParamId,
  getBody,
};
