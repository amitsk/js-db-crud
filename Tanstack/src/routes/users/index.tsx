import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { desc, eq } from 'drizzle-orm'
import { users } from '@/db/schema'

const getUsers = createServerFn({
  method: 'GET',
}).handler(async () => {
  return await db.query.users.findMany({
    orderBy: [desc(users.createdAt)],
  })
})

const deleteUser = createServerFn({
  method: 'POST',
})
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await db.delete(users).where(eq(users.id, data.id))
    return { success: true }
  })

export const Route = createFileRoute('/users/')({
  component: UsersList,
  loader: async () => await getUsers(),
})

function UsersList() {
  const router = useRouter()
  const users = Route.useLoaderData()

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser({ data: { id } })
        router.invalidate()
      } catch (error) {
        console.error('Failed to delete user:', error)
        alert('Failed to delete user')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <Link
            to="/users/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Add New User
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No users found. <Link to="/users/new" className="text-blue-600 hover:text-blue-800">Create the first one</Link>.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to="/users/$userId"
                          params={{ userId: user.id.toString() }}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}