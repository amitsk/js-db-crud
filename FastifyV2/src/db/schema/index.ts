export * from './user.schema';
export * from './product.schema';
export * from './order.schema';
export * from './orderItem.schema';

import { users, usersRelations } from './user.schema';
import { products, productsRelations } from './product.schema';
import { orders, ordersRelations } from './order.schema';
import { orderItems, orderItemsRelations } from './orderItem.schema';

export const schema = {
  users,
  usersRelations,
  products,
  productsRelations,
  orders,
  ordersRelations,
  orderItems,
  orderItemsRelations,
};
