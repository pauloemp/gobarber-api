import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/app.error';

function formatConsoleDate(date: Date) {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `\x1b[34m${hour < 10 ? `0${hour}` : hour}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}\x1b[0m`;
}

export default function globalExceptionHandler(
  err: Error,
  request: Request,
  response: Response,
  _next: NextFunction,
): Response {
  if (err instanceof AppError) {
    console.error(`[\x1b[33mAPP EXCEPTION\x1b[0m - \x1b[31m${err.status}\x1b[0m] ${formatConsoleDate(new Date())} ${err.message}`); // eslint-disable-line
    return response.status(err.status).json({
      status: 'App Exception',
      message: err.message,
    });
  }

  // if (isCelebrate(err)) {
  //   console.error(`[\x1b[33mVALIDATION EXCEPTION\x1b[0m - \x1b[31m400\x1b[0m] ${formatConsoleDate(new Date())} ${err.message}`); // eslint-disable-line
  //   return response.status(400).json({
  //     status: 'Invalid Request Param',
  //     message: err.message,
  //   });
  // }

  console.error(`[\x1b[31mSERVER ERROR\x1b[0m - \x1b[31m500\x1b[0m] ${formatConsoleDate(new Date())} ${err.message}`); // eslint-disable-line
  return response.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
}
