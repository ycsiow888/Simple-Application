class ErrorCode {
  static readonly DOMAIN_NOT_FOUND = {
    message: 'Domain not found',
    code: 'DOMAIN_NOT_FOUND'
  };
  static readonly USER_NOT_FOUND = {
    message: 'User not found',
    code: 'USER_NOT_FOUND'
  };
  static readonly UNEXPECTED_ERROR = {
    message: 'Unexpected error. Please contact administrator',
    code: 'UNEXPECTED_ERROR'
  };
}

export interface IErrorCode {
  message: string;
  code: string;
}

export default ErrorCode;
