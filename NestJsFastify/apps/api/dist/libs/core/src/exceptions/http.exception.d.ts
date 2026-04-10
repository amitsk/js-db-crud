import { HttpException } from "@nestjs/common"
export declare class HttpError extends HttpException {
  constructor(status: number, message: string)
}
