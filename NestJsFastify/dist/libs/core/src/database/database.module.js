import { __decorate } from "tslib";
import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    Global(),
    Module({
        providers: [DatabaseService],
        exports: [DatabaseService],
    })
], DatabaseModule);
export { DatabaseModule };
//# sourceMappingURL=database.module.js.map