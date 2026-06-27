import { STATUS_CODES } from 'node:http';
import { constants } from 'node:http2';

const { HTTP_STATUS_NOT_FOUND, HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

export class HttpError extends Error {
	constructor(status = HTTP_STATUS_INTERNAL_SERVER_ERROR, message = STATUS_CODES[status]) {
		super(message);
		this.status = status;
		Error.captureStackTrace(this, this.constructor);
	}

	toJSON() {
		return { message: this.message, ...this };
	}
}

export const notFoundError = new HttpError(HTTP_STATUS_NOT_FOUND);

export const isHttpError = (error) => error instanceof HttpError;
