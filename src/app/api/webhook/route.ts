import { type NextRequest } from "next/server";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest): Promise<Response> {
  const secret = headers().get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body: unknown = await request.json();
  if (typeof body === "object" && body !== null && "tags" in body && Array.isArray(body.tags)) {
    for (const tag of body.tags) {
      if (typeof tag === "string") {
        revalidateTag(tag);
      }
    }

    return new Response(null, { status: 200 });
  }

  return new Response("Bad Request", { status: 400 });
}
