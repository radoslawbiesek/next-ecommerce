import { type Route } from "next";
import Link from "next/link";

import * as categoriesService from "@/services/categories";

export default async function CategoriesPage() {
  const categories = await categoriesService.getAll();

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.slug}>
          <Link href={`categories/${category.slug}` as Route}>{category.name}</Link>
        </li>
      ))}
    </ul>
  );
}
