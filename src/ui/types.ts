export type ProductItem = {
  id: string;
  description: string;
  name: string;
  price: number;
  slug: string;
  images: {
    url: string;
    alt: string;
  }[];
  categories?: {
    name: string;
    id: string;
  }[];
};
