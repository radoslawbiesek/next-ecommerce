import { type NextRequest } from "next/server";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";
import { type ProductCreatedEvent } from "@/gql/graphql";

export async function POST(request: NextRequest): Promise<Response> {
  const secret = headers().get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body: unknown = await request.json();

  if (typeof body !== "object" || body === null) {
    return new Response("Bad Request", { status: 400 });
  }

  const event = body as ProductCreatedEvent;
  switch (event.topic) {
    case "PRODUCT_CREATED": {
      revalidateTag("products");
      revalidateTag("categories");
      revalidateTag("collections");

      return new Response(null, { status: 200 });
    }
  }

  return new Response("Bad Request", { status: 400 });
}
