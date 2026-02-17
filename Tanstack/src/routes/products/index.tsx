import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { desc } from 'drizzle-orm'
import { products } from '@/db/schema'

const getProducts = createServerFn({
  method: 'GET',
}).handler(async () => {
  return await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
  })
})

const createProduct = createServerFn({
  method: 'POST',
})
  .inputValidator((data: { name: string; price: string; description: string }) => data)
  .handler(async ({ data }) => {
    await db.insert(products).values({
      name: data.name,
      price: data.price,
      description: data.description,
    })
    return { success: true }
  })

export const Route = createFileRoute('/products/')({
  component: ProductsDemo,
  loader: async () => await getProducts(),
})

function ProductsDemo() {
  const router = useRouter()
  const products = Route.useLoaderData()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    const price = formData.get('price') as string
    const description = formData.get('description') as string

    if (!name || !price) return

    try {
      await createProduct({ data: { name, price, description } })
      router.invalidate()
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Failed to create product:', error)
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 text-transparent bg-clip-text">
            Products Database Demo
          </h1>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-indigo-200">Products</h2>

        <ul className="space-y-3 mb-6">
          {products.map((product) => (
            <li
              key={product.id}
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
                    {product.name}
                  </span>
                  <span className="text-sm text-indigo-300/70 block">
                    ${product.price}
                  </span>
                  {product.description && (
                    <span className="text-sm text-indigo-300/50 block">
                      {product.description}
                    </span>
                  )}
                </div>
                <span className="text-xs text-indigo-300/70">#{product.id}</span>
              </div>
            </li>
          ))}
          {products.length === 0 && (
            <li className="text-center py-8 text-indigo-300/70">
              No products yet. Create one below!
            </li>
          )}
        </ul>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="name"
              placeholder="Product name..."
              className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all text-white placeholder-indigo-300/50"
              style={{
                background: 'rgba(93, 103, 227, 0.1)',
                borderColor: 'rgba(93, 103, 227, 0.3)',
                focusRing: 'rgba(93, 103, 227, 0.5)',
              }}
            />
            <input
              type="number"
              step="0.01"
              name="price"
              placeholder="Price..."
              className="w-32 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all text-white placeholder-indigo-300/50"
              style={{
                background: 'rgba(93, 103, 227, 0.1)',
                borderColor: 'rgba(93, 103, 227, 0.3)',
                focusRing: 'rgba(93, 103, 227, 0.5)',
              }}
            />
          </div>
          <textarea
            name="description"
            placeholder="Description (optional)..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all text-white placeholder-indigo-300/50 resize-none"
            style={{
              background: 'rgba(93, 103, 227, 0.1)',
              borderColor: 'rgba(93, 103, 227, 0.3)',
              focusRing: 'rgba(93, 103, 227, 0.5)',
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
            Add Product
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
            Products Management
          </h3>
          <p className="text-sm text-indigo-300/80 mb-4">
            Manage your product catalog with name, price, and description
          </p>
        </div>
      </div>
    </div>
  )
}