import NextImage from "next/image";

type ProductListItemCoverImageProps = {
  src: string;
  alt: string;
};

export function ProductListItemCoverImage({ src, alt }: ProductListItemCoverImageProps) {
  return (
    <figure>
      <NextImage src={src} alt={alt} width={320} height={320} />
    </figure>
  );
}
