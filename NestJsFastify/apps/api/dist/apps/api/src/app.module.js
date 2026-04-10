"use strict"
//# sourceMappingURL=app.module.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.AppModule = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const src_1 = require("../../../libs/domain/user/src")
const src_2 = require("../../../libs/domain/product/src")
const src_3 = require("../../../libs/domain/order/src")
const src_4 = require("../../../libs/core/src")
let AppModule = class AppModule {}
exports.AppModule = AppModule
exports.AppModule = AppModule = tslib_1.__decorate(
  [
    (0, common_1.Module)({
      imports: [
        src_4.CoreModule,
        src_1.UserModule,
        src_2.ProductModule,
        src_3.OrderModule,
      ],
    }),
  ],
  AppModule,
)
