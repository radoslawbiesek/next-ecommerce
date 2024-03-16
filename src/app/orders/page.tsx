import { auth, currentUser } from "@clerk/nextjs";

export default async function OrdersPage() {
  const res = auth();
  const user = await currentUser();
  return (
    <div>
      <pre>{JSON.stringify(res, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
