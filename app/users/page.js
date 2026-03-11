
import { Suspense } from "react";
import { getAllUsers } from "../lib/api";
import Loading from "../components/Loading";
import UserTable from "../components/UsersTable";

export const metadata = {
  title: "Users List - DummyJSON",
  description: "Browse 50 random users",
};

export const revalidate = 3600; 

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Users</h1>

      <Suspense fallback={<Loading />}>
        <UserTable users={users} />
      </Suspense>
    </main>
  );
}