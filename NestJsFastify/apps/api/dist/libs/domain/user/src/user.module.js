"use strict"
//# sourceMappingURL=user.module.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.UserModule = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const user_controller_1 = require("./presentation/user.controller")
const user_service_1 = require("./application/user.service")
const user_repository_1 = require("./infrastructure/user.repository")
let UserModule = class UserModule {}
exports.UserModule = UserModule
exports.UserModule = UserModule = tslib_1.__decorate(
  [
    (0, common_1.Module)({
      controllers: [user_controller_1.UserController],
      providers: [user_service_1.UserService, user_repository_1.UserRepository],
      exports: [user_service_1.UserService, user_repository_1.UserRepository],
    }),
  ],
  UserModule,
)
