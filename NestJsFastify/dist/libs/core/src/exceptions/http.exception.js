import { HttpException } from "@nestjs/common";
import createHttpError from "http-errors";
export class HttpError extends HttpException {
    constructor(status, message) {
        super(createHttpError(status, message), status);
    }
}
//# sourceMappingURL=http.exception.js.map