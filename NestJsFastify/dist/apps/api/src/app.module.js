import { __decorate } from "tslib";
import { Module } from "@nestjs/common";
import { UserModule } from "../../../libs/domain/user/src";
import { ProductModule } from "../../../libs/domain/product/src";
import { OrderModule } from "../../../libs/domain/order/src";
import { CoreModule } from "../../../libs/core/src";
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [CoreModule, UserModule, ProductModule, OrderModule],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map