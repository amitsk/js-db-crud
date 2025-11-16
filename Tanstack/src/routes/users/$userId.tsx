import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'

const getUser = createServerFn({
  method: 'GET',
})
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, data.id),
    })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  })

const updateUser = createServerFn({
  method: 'POST',
})
  .inputValidator((data: { id: number; name: string; email: string }) => data)
  .handler(async ({ data }) => {
    await db.update(users).set({
      name: data.name,
      email: data.email,
    }).where(eq(users.id, data.id))
    return { success: true }
  })

const deleteUser = createServerFn({
  method: 'POST',
})
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await db.delete(users).where(eq(users.id, data.id))
    return { success: true }
  })

export const Route = createFileRoute('/users/$userId')({
  component: UserDetail,
  errorComponent: UserError,
  loader: async ({ params }) => {
    const userId = parseInt(params.userId)
    if (isNaN(userId)) {
      throw new Error('Invalid user ID')
    }
    return await getUser({ data: { id: userId } })
  },
})

function UserDetail() {
  const router = useRouter()
  const user = Route.useLoaderData()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    if (!name || !email) {
      alert('Please fill in all fields')
      return
    }

    try {
      await updateUser({ data: { id: user.id, name, email } })
      router.navigate({ to: '/users' })
    } catch (error) {
      console.error('Failed to update user:', error)
      alert('Failed to update user. Email might already exist.')
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser({ data: { id: user.id } })
        router.navigate({ to: '/users' })
      } catch (error) {
        console.error('Failed to delete user:', error)
        alert('Failed to delete user')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
            <Link
              to="/users"
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              ← Back to Users
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                defaultValue={user.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter user name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                defaultValue={user.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
              />
            </div>

            <div className="pt-4 space-y-3">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Update User
              </button>

              <div className="flex gap-3">
                <Link
                  to="/users"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors text-center"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Created:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UserError() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-6">
            The user you're looking for doesn't exist or has been deleted.
          </p>
          <Link
            to="/users"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Back to Users
          </Link>
        </div>
      </div>
    </div>
  )
}