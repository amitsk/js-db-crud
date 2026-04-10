import { Module } from "@nestjs/common";
import { UserModule } from "../../../libs/domain/user/src";
import { ProductModule } from "../../../libs/domain/product/src";
import { OrderModule } from "../../../libs/domain/order/src";
import { CoreModule } from "../../../libs/core/src";

@Module({
  imports: [CoreModule, UserModule, ProductModule, OrderModule],
})
export class AppModule {}
