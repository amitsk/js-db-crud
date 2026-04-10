import { __decorate } from "tslib";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "./config";
import { DatabaseModule } from "./database";
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    Global(),
    Module({
        imports: [ConfigModule, DatabaseModule],
        exports: [ConfigModule, DatabaseModule],
    })
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map