import { __decorate } from "tslib";
import { Module } from "@nestjs/common";
import { UserController } from "./presentation/user.controller";
import { UserService } from "./application/user.service";
import { UserRepository } from "./infrastructure/user.repository";
let UserModule = class UserModule {
};
UserModule = __decorate([
    Module({
        controllers: [UserController],
        providers: [UserService, UserRepository],
        exports: [UserService, UserRepository],
    })
], UserModule);
export { UserModule };
//# sourceMappingURL=user.module.js.map