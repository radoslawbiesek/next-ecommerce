import * as collectionsService from "@/services/collections";
import { CollectionListItem } from "@/ui/components/collections/CollectionListItem";

export async function CollectionsList() {
  const collections = await collectionsService.getAll();

  return (
    <section className="fullwidth-container flex flex-col gap-3 bg-neutral py-10">
      <div className="carousel w-full">
        {collections?.map((collection) => (
          <div id={collection.slug} key={collection.slug} className="carousel-item flex w-full justify-center">
            <CollectionListItem key={collection.slug} slug={collection.slug} />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2">
        {collections?.map((collection, index) => (
          <a key={collection.slug} href={`#${collection.slug}`} className="btn-neutral-content btn btn-xs">
            {index + 1}
          </a>
        ))}
      </div>
    </section>
  );
}
