class ApiError extends Error {
  constructor(
    statuscode,
    messege = "Something went Wrong",
    errors = [],
    stack = "",
  ) {
    super(messege);
    this.statuscode = statuscode;
    this.errors = errors;
    this.data = null;
    this.sucess = false;
    this.message = messege;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
