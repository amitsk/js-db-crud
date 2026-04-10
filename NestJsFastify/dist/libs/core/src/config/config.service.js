import { __decorate } from "tslib";
import { Injectable } from "@nestjs/common";
import { z } from "zod";
const configSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(3000),
    HOST: z.string().default("0.0.0.0"),
    DATABASE_URL: z.string().url(),
});
let ConfigService = class ConfigService {
    constructor() {
        this.config = configSchema.parse(process.env);
    }
    get nodeEnv() {
        return this.config.NODE_ENV;
    }
    get port() {
        return this.config.PORT;
    }
    get host() {
        return this.config.HOST;
    }
    get databaseUrl() {
        return this.config.DATABASE_URL;
    }
    get isDevelopment() {
        return this.config.NODE_ENV === "development";
    }
    get isProduction() {
        return this.config.NODE_ENV === "production";
    }
    get isTest() {
        return this.config.NODE_ENV === "test";
    }
};
ConfigService = __decorate([
    Injectable()
], ConfigService);
export { ConfigService };
//# sourceMappingURL=config.service.js.map