import { revalidatePath } from "next/cache";

export async function POST(): Promise<Response> {
  revalidatePath("products/[pageNumber]");
  revalidatePath("product/[slug]");
  revalidatePath("categories/[slug]/[pageNumber]");
  revalidatePath("collections/[slug]/[pageNumber]");
  revalidatePath("/");

  return new Response(null, { status: 200 });
}
