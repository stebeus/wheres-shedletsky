import { HttpError, isHttpError, notFoundError } from './helpers.js';

export const handleNotFoundError = (req, res, next) => next(notFoundError);

export const handleError = (error, req, res, next) => {
	if (res.headersSent) return next(error);

	const httpError = isHttpError(error) ? error : new HttpError();

	if (!isHttpError(error)) req.log.error(error);

	res.status(httpError.status).send({ error: httpError });
};
