import { __decorate } from "tslib";
import { Global, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
let ConfigModule = class ConfigModule {
};
ConfigModule = __decorate([
    Global(),
    Module({
        providers: [ConfigService],
        exports: [ConfigService],
    })
], ConfigModule);
export { ConfigModule };
//# sourceMappingURL=config.module.js.map