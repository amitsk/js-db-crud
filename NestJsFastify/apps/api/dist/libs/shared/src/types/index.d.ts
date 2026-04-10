export interface BaseEntity {
  id: number
  createdAt: Date
  updatedAt: Date
}
export interface User extends BaseEntity {
  email: string
  passwordHash: string
  name: string
  role: string
}
export interface Product extends BaseEntity {
  name: string
  description?: string
  price: number
  stock: number
}
export interface Order extends BaseEntity {
  userId: number
  totalAmount: number
  status: string
}
export interface OrderItem {
  orderId: number
  productId: number
  quantity: number
  priceAtPurchase: number
}
