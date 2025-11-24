// how data response is handle and what we get

class ApiResponse {
  constructor(statusCode, data, message = "success") {
    (this.statusCode = statusCode),
      (this.data = data),
      (this.message = message);
    this.success = statusCode < 400;
  }
}

module.exports = ApiResponse;
