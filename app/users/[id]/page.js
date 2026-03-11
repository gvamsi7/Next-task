import { getUser } from "@/app/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const user = await getUser(resolvedParams.id);

  if (!user) {
    return { title: "User Not Found" };
  }

  return {
    title: `${user.firstName} ${user.lastName}`,
    description: `Profile of ${user.username}`,
  };
}

export default async function UserDetail({ params }) {
  const resolvedParams = await params;
  const user = await getUser(resolvedParams.id);

  if (!user) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <Link
        href="/users"
        className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        ← Back to users
      </Link>

      <div className="overflow-hidden rounded-xl border bg-white shadow">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
              width={128}
              height={128}
            />
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className="mt-1 text-lg text-gray-600">@{user.username}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Personal Info</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Age</dt>
                <dd className="text-gray-900">{user.age}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="capitalize text-gray-900">{user.gender}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-gray-900">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="text-gray-900">{user.phone}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Company</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Company</dt>
                <dd className="text-gray-900">{user.company.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Department</dt>
                <dd className="text-gray-900">{user.company.department}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Title</dt>
                <dd className="text-gray-900">{user.company.title}</dd>
              </div>
            </dl>
          </div>

          <div className="md:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">Address</h2>
            <p className="text-gray-900">
              {user.address.city}, {user.address.state}
              <br />
              {user.address.address}
              <br />
              {user.address.country} {user.address.postalCode}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}