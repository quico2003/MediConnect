class CustomError extends Error {
  constructor(message, code = 0) {
    super(message);
    this.code = code;
  }
}

export default CustomError;
