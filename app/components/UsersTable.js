import Link from "next/link";

export default function UserTable({ users }) {
  if (!users || users.length === 0) {
    return (
      <div className="rounded-lg bg-red-50 p-8 text-center text-red-700">
        No users found. Please try again later.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Company</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Department</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4">
                <Link
                  href={`/users/${user.id}`}
                  className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {user.firstName} {user.lastName}
                </Link>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{user.email}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{user.phone}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{user.company.name}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{user.company.department}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{user.company.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}