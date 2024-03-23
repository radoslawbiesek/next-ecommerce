import { type NextRequest } from "next/server";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest): Promise<Response> {
  const secret = headers().get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body: unknown = await request.json();
  if (typeof body !== "object" || body === null) {
    return new Response("Bad Request", { status: 400 });
  }

  revalidatePath("products/[pageNumber]");
  revalidatePath("product/[slug]");
  revalidatePath("categories/[slug]/[pageNumber]");
  revalidatePath("collections/[slug]/[pageNumber]");
  revalidatePath("/");

  return new Response(null, { status: 200 });
}
