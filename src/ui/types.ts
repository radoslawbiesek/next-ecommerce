export type ProductItem = {
  id: string;
  category: string;
  description: string;
  name: string;
  price: number;
  coverImage: {
    src: string;
    alt: string;
  };
};
