import { type Route } from "next";
import Link from "next/link";

import * as collectionsService from "@/services/collections";

export default async function CollectionsPage() {
  const collections = await collectionsService.getAll();

  return (
    <ul>
      {collections.map((collection) => (
        <li key={collection.slug}>
          <Link href={`collections/${collection.slug}` as Route}>{collection.name}</Link>
        </li>
      ))}
    </ul>
  );
}
