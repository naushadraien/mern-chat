class ErrorHandler extends Error {
  statusCode: number;
  details: string[] | string | null;

  constructor(
    message: string,
    statusCode: number,
    details: string[] | string | null = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export default ErrorHandler;
