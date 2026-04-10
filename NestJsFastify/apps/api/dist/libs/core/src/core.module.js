"use strict"
//# sourceMappingURL=core.module.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.CoreModule = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const config_1 = require("./config")
const database_1 = require("./database")
let CoreModule = class CoreModule {}
exports.CoreModule = CoreModule
exports.CoreModule = CoreModule = tslib_1.__decorate(
  [
    (0, common_1.Global)(),
    (0, common_1.Module)({
      imports: [config_1.ConfigModule, database_1.DatabaseModule],
      exports: [config_1.ConfigModule, database_1.DatabaseModule],
    }),
  ],
  CoreModule,
)
