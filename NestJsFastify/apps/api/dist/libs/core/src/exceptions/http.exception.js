"use strict"
//# sourceMappingURL=http.exception.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.HttpError = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const http_errors_1 = tslib_1.__importDefault(require("http-errors"))
class HttpError extends common_1.HttpException {
  constructor(status, message) {
    super((0, http_errors_1.default)(status, message), status)
  }
}
exports.HttpError = HttpError
