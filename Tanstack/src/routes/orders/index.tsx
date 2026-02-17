import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { desc } from 'drizzle-orm'
import { orders, users, products } from '@/db/schema'

const getOrders = createServerFn({
  method: 'GET',
}).handler(async () => {
  const ordersData = await db.query.orders.findMany({
    orderBy: [desc(orders.createdAt)],
    with: {
      user: true,
      product: true,
    },
  })
  const usersData = await db.query.users.findMany()
  const productsData = await db.query.products.findMany()
  return { orders: ordersData, users: usersData, products: productsData }
})

const createOrder = createServerFn({
  method: 'POST',
})
  .inputValidator((data: { userId: number; productId: number; quantity: number }) => data)
  .handler(async ({ data }) => {
    await db.insert(orders).values({
      userId: data.userId,
      productId: data.productId,
      quantity: data.quantity,
    })
    return { success: true }
  })

export const Route = createFileRoute('/orders/')({
  component: OrdersDemo,
  loader: async () => await getOrders(),
})

function OrdersDemo() {
  const router = useRouter()
  const { orders, users, products } = Route.useLoaderData()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const userId = parseInt(formData.get('userId') as string)
    const productId = parseInt(formData.get('productId') as string)
    const quantity = parseInt(formData.get('quantity') as string)

    if (!userId || !productId || !quantity) return

    try {
      await createOrder({ data: { userId, productId, quantity } })
      router.invalidate()
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Failed to create order:', error)
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 text-white"
      style={{
        background:
          'linear-gradient(135deg, #0c1a2b 0%, #1a2332 50%, #16202e 100%)',
      }}
    >
      <div
        className="w-full max-w-2xl p-8 rounded-xl shadow-2xl border border-white/10"
        style={{
          background:
            'linear-gradient(135deg, rgba(22, 32, 46, 0.95) 0%, rgba(12, 26, 43, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          className="flex items-center justify-center gap-4 mb-8 p-4 rounded-lg"
          style={{
            background:
              'linear-gradient(90deg, rgba(93, 103, 227, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid rgba(93, 103, 227, 0.2)',
          }}
        >
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-lg blur-lg opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 text-transparent bg-clip-text">
            Orders Database Demo
          </h1>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-indigo-200">Orders</h2>

        <ul className="space-y-3 mb-6">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-lg p-4 shadow-md border transition-all hover:scale-[1.02] cursor-pointer group"
              style={{
                background:
                  'linear-gradient(135deg, rgba(93, 103, 227, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                borderColor: 'rgba(93, 103, 227, 0.3)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-medium text-white group-hover:text-indigo-200 transition-colors">
                    {order.user.name} ordered {order.product.name}
                  </span>
                  <span className="text-sm text-indigo-300/70 block">
                    Quantity: {order.quantity}
                  </span>
                </div>
                <span className="text-xs text-indigo-300/70">#{order.id}</span>
              </div>
            </li>
          ))}
          {orders.length === 0 && (
            <li className="text-center py-8 text-indigo-300/70">
              No orders yet. Create one below!
            </li>
          )}
        </ul>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <select
              name="userId"
              className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all text-white"
              style={{
                background: 'rgba(93, 103, 227, 0.1)',
                borderColor: 'rgba(93, 103, 227, 0.3)',
              }}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
            <select
              name="productId"
              className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all text-white"
              style={{
                background: 'rgba(93, 103, 227, 0.1)',
                borderColor: 'rgba(93, 103, 227, 0.3)',
              }}
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (${product.price})
                </option>
              ))}
            </select>
          </div>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity..."
            min="1"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all text-white placeholder-indigo-300/50"
            style={{
              background: 'rgba(93, 103, 227, 0.1)',
              borderColor: 'rgba(93, 103, 227, 0.3)',
            }}
          />
          <button
            type="submit"
            className="w-full px-6 py-3 font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #5d67e3 0%, #8b5cf6 100%)',
              color: 'white',
            }}
          >
            Add Order
          </button>
        </form>

        <div
          className="mt-8 p-6 rounded-lg border"
          style={{
            background: 'rgba(93, 103, 227, 0.05)',
            borderColor: 'rgba(93, 103, 227, 0.2)',
          }}
        >
          <h3 className="text-lg font-semibold mb-2 text-indigo-200">
            Orders Management
          </h3>
          <p className="text-sm text-indigo-300/80 mb-4">
            Create orders linking users to products with quantities
          </p>
        </div>
      </div>
    </div>
  )
}