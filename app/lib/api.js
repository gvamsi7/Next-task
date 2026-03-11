const BASE = "https://dummyjson.com/users";

export async function getAllUsers() {
  try {
    const res = await fetch(`${BASE}?limit=50`, {
      next: { revalidate: 3600 }, // revalidate every hour
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    const { users } = await res.json();
    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getUser(id) {
  try {
    const res = await fetch(`${BASE}/${id}`, {
      next: { revalidate: 86400 }, // cache 24h
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}