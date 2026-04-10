"use strict"
//# sourceMappingURL=index.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.schema = void 0
const tslib_1 = require("tslib")
tslib_1.__exportStar(require("./user.schema"), exports)
tslib_1.__exportStar(require("./product.schema"), exports)
tslib_1.__exportStar(require("./order.schema"), exports)
tslib_1.__exportStar(require("./orderItem.schema"), exports)
const user_schema_1 = require("./user.schema")
const product_schema_1 = require("./product.schema")
const order_schema_1 = require("./order.schema")
const orderItem_schema_1 = require("./orderItem.schema")
exports.schema = {
  users: user_schema_1.users,
  usersRelations: user_schema_1.usersRelations,
  products: product_schema_1.products,
  productsRelations: product_schema_1.productsRelations,
  orders: order_schema_1.orders,
  ordersRelations: order_schema_1.ordersRelations,
  orderItems: orderItem_schema_1.orderItems,
  orderItemsRelations: orderItem_schema_1.orderItemsRelations,
}
