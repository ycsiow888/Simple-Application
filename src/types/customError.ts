import ErrorCode, { IErrorCode } from '../constant/error';

class CustomError extends Error {
  public errorCode: IErrorCode;

  constructor(errorCode: IErrorCode) {
    super('');

    this.errorCode = errorCode;
  }
}

export default CustomError;
