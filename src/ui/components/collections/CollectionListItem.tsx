import NextImage from "next/image";
import NextLink from "next/link";

import * as collectionService from "@/services/collections";

type CollectionListItemProps = {
  slug: string;
};

export async function CollectionListItem({ slug }: CollectionListItemProps) {
  const result = await collectionService.getBySlug(slug, {
    productsTake: 2,
  });

  if (!result) {
    return null;
  }

  return (
    <div className="card rounded-xl bg-base-100">
      <figure className="flex">
        {result.products.data.map((product) => (
          <NextImage
            key={product.id}
            src={product.images[0]?.url || ""}
            alt={product.images[0]?.url || product.name}
            width={400}
            height={400}
          />
        ))}
      </figure>
      <div className="card-body rounded-b-xl bg-base-300">
        <div className="flex justify-between">
          <div>
            <h2 className="card-title">{result.name}</h2>
            <p>Check our latest collection!</p>
          </div>
          <NextLink href={`/collections/${slug}/1`} className="btn btn-primary">
            Shop
          </NextLink>
        </div>
      </div>
    </div>
  );
}
