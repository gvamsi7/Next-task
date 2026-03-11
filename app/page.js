// app/page.js

import { Suspense } from "react";
import Link from "next/link";
import { getAllUsers } from "./lib/api";
import UserTable from "./components/UsersTable";
import Loading from "./components/Loading";
import UserSearchTable from "./components/UserSearchTable";

export const metadata = {
  title: "Users • DummyJSON App",
  description: "Browse random users from DummyJSON API",
};

export const revalidate = 3600; 

export default async function HomePage() {
  const users = await getAllUsers();

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Users List</h1>
        <p className="text-sm text-gray-600">
          Click any name to see full profile
        </p>
      </div>

      <Suspense fallback={<Loading />}>
      <UserSearchTable users={users} />      </Suspense>

      <div className="mt-12 text-center text-sm text-gray-500">
        Data from{" "}
        <a
          href="https://dummyjson.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          dummyjson.com
        </a>{" "}
        • Fetched server-side
      </div>
    </main>
  );
}