import { HttpException } from "@nestjs/common";
import createHttpError from "http-errors";

export class HttpError extends HttpException {
  constructor(status: number, message: string) {
    super(createHttpError(status, message), status);
  }
}
