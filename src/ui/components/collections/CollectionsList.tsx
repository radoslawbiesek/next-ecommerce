import Link from "next/link";
import { type Route } from "next";
import NextImage from "next/image";

import * as collectionsService from "@/services/collections";

export async function CollectionsList() {
  const collections = await collectionsService.getAll();

  return (
    <ul className="flex justify-center gap-4 p-4">
      {collections?.map((collection) => (
        <li key={collection.slug}>
          <Link href={`/collections/${collection.slug}` as Route}>
            <div className="card card-compact bg-base-200">
              <figure>
                <NextImage src={collection.imageUrl} alt={collection.name} width={400} height={400} />
              </figure>
              <div className="card-body items-center">
                <h3 className="card-title">{collection.name}</h3>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
