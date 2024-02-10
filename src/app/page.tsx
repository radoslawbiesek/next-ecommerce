import { type ProductItem } from "@/ui/types";
import { ProductList } from "@/ui/organisms/ProductList";

const PRODUCTS: ProductItem[] = [
  {
    id: "1",
    name: "Product 1",
    description: "Product 1 description",
    category: "Category 1",
    price: 100,
    coverImage: { src: "https://via.placeholder.com/320x320", alt: "Product 1" },
  },
  {
    id: "2",
    name: "Product 2",
    description: "Product 2 description",
    category: "Category 2",
    price: 200,
    coverImage: { src: "https://via.placeholder.com/320x320", alt: "Product 2" },
  },
  {
    id: "3",
    name: "Product 3",
    description: "Product 3 description",
    category: "Category 3",
    price: 300,
    coverImage: { src: "https://via.placeholder.com/320x320", alt: "Product 3" },
  },
  {
    id: "4",
    name: "Product 4",
    description: "Product 4 description",
    category: "Category 4",
    price: 400,
    coverImage: { src: "https://via.placeholder.com/320x320", alt: "Product 4" },
  },
];

export default function Home() {
  return (
    <section className="h-full">
      <ProductList products={PRODUCTS} />
    </section>
  );
}
