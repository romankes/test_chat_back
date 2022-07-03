import HttpStatusCodes from 'http-status-codes';

export type TCustomError = {
  status: number;
  message: string;
};

export const unauthorized = (): TCustomError => {
  return {
    message: 'User unauthorized',
    status: HttpStatusCodes.UNAUTHORIZED,
  };
};

export const paramsIsMising = (): TCustomError => {
  return {
    message: 'Params is missing',
    status: HttpStatusCodes.BAD_REQUEST,
  };
};

export const paramsIsInvalid = (): TCustomError => {
  return {
    message: 'Params is invalid',
    status: HttpStatusCodes.BAD_REQUEST,
  };
};

export const userNotFound = (): TCustomError => {
  return {
    message: 'User not found',
    status: HttpStatusCodes.NOT_FOUND,
  };
};

export const roomNotFound = (): TCustomError => {
  return {
    message: 'Room not found',
    status: HttpStatusCodes.NOT_FOUND,
  };
};

export const messageNotFound = (): TCustomError => {
  return {
    message: 'Message not found',
    status: HttpStatusCodes.NOT_FOUND,
  };
};

export const userAlreadyExists = (): TCustomError => {
  return {
    message: 'User already exists',
    status: HttpStatusCodes.BAD_REQUEST,
  };
};
