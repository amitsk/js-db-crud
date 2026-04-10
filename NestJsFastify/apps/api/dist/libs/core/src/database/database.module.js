"use strict"
//# sourceMappingURL=database.module.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.DatabaseModule = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const database_service_1 = require("./database.service")
let DatabaseModule = class DatabaseModule {}
exports.DatabaseModule = DatabaseModule
exports.DatabaseModule = DatabaseModule = tslib_1.__decorate(
  [
    (0, common_1.Global)(),
    (0, common_1.Module)({
      providers: [database_service_1.DatabaseService],
      exports: [database_service_1.DatabaseService],
    }),
  ],
  DatabaseModule,
)
