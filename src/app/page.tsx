import { TopProducts } from "@/ui/components/products/TopProducts";
import { CollectionsList } from "@/ui/components/collections/CollectionsList";

export default async function HomePage() {
  return (
    <>
      <CollectionsList />
      <TopProducts />
    </>
  );
}
