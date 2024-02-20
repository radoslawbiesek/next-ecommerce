type ProductListItemCoverImageProps = {
  src: string;
  alt: string;
};

export function ProductListItemCoverImage({ src, alt }: ProductListItemCoverImageProps) {
  return (
    <figure>
      <img src={src} alt={alt} width={320} height={320} />
    </figure>
  );
}
