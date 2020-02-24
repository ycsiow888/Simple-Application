import { Request, Response } from 'express';
import CustomError from '../types/customError';
import { IErrorCode } from '../constant/error';

// Every post request will comes to this when hitting error
const errorHandlingMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: any
) => {
  if (req.path.substring(0, 4) === '/api') {
    if (error instanceof CustomError) {
      const customError: CustomError = error;
      const errorCode: IErrorCode = customError.errorCode;

      return res
        .status(400)
        .json({ message: errorCode.message, code: errorCode.code });
    }
    res.status(400).json({ message: error.message });
  }
  next();
};

export default errorHandlingMiddleware;
