"use strict"
//# sourceMappingURL=config.service.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.ConfigService = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const zod_1 = require("zod")
const configSchema = zod_1.z.object({
  NODE_ENV: zod_1.z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: zod_1.z.coerce.number().default(3000),
  HOST: zod_1.z.string().default("0.0.0.0"),
  DATABASE_URL: zod_1.z.string().url(),
})
let ConfigService = class ConfigService {
  constructor() {
    this.config = configSchema.parse(process.env)
  }
  get nodeEnv() {
    return this.config.NODE_ENV
  }
  get port() {
    return this.config.PORT
  }
  get host() {
    return this.config.HOST
  }
  get databaseUrl() {
    return this.config.DATABASE_URL
  }
  get isDevelopment() {
    return (
      this.config.NODE_ENV ===
      "development"
    )
  }
  get isProduction() {
    return (
      this.config.NODE_ENV ===
      "production"
    )
  }
  get isTest() {
    return (
      this.config.NODE_ENV ===
      "test"
    )
  }
}
exports.ConfigService = ConfigService
exports.ConfigService = ConfigService = tslib_1.__decorate(
  [(0, common_1.Injectable)(), tslib_1.__metadata("design:paramtypes", [])],
  ConfigService,
)
