import { revalidatePath } from "next/cache";

export async function POST(): Promise<Response> {
  revalidatePath("/", "layout");

  return new Response(null, { status: 200 });
}
