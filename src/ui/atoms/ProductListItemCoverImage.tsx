import { type ProductItem } from "@/ui/types";

type ProductListItemCoverImageProps = ProductItem["coverImage"];

export function ProductListItemCoverImage({ src, alt }: ProductListItemCoverImageProps) {
  return (
    <figure>
      <img src={src} alt={alt} width={320} height={320} />
    </figure>
  );
}
