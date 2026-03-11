// components/UserSearchTable.js
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UserSearchTable({ users }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const company = user.company.name.toLowerCase();
    const term = searchTerm.toLowerCase();

    return (
      fullName.includes(term) ||
      email.includes(term) ||
      company.includes(term) ||
      user.phone.includes(term)
    );
  });

  return (
    <div>
      {/* Search Input */}
      <div className="mb-6 max-w-md">
        <label htmlFor="search" className="mb-2 block text-sm font-medium text-gray-700">
          Search users
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search by name, email, company, phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-gray-600">
        Showing {filteredUsers.length} of {users.length} users
      </p>

      {/* Table */}
      {filteredUsers.length === 0 ? (
        <div className="rounded-lg bg-yellow-50 p-8 text-center text-yellow-700">
          No users match your search. Try different keywords.
        </div>
      ) : (
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
              {filteredUsers.map((user) => (
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
      )}
    </div>
  );
}