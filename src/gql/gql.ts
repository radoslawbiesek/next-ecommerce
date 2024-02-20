/* eslint-disable */
import * as types from "./graphql";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "query CategoriesGetList {\n  categories {\n    data {\n      name\n      id\n      slug\n      description\n    }\n  }\n}":
    types.CategoriesGetListDocument,
  "query CategoryGetBySlug($slug: String) {\n  category(slug: $slug) {\n    name\n    description\n    id\n    products {\n      id\n      name\n      slug\n      description\n      categories {\n        name\n        id\n      }\n      images {\n        url\n        alt\n      }\n      price\n    }\n  }\n}":
    types.CategoryGetBySlugDocument,
  "query CollectionGetBySlug($slug: String) {\n  collection(slug: $slug) {\n    name\n    description\n    id\n    products {\n      id\n      name\n      slug\n      description\n      categories {\n        name\n        id\n      }\n      images {\n        url\n        alt\n      }\n      price\n    }\n  }\n}":
    types.CollectionGetBySlugDocument,
  "query CollectionsGetList {\n  collections {\n    data {\n      name\n      id\n      slug\n      description\n    }\n  }\n}":
    types.CollectionsGetListDocument,
  "query ProductGetBySlug($slug: String) {\n  product(slug: $slug) {\n    id\n    name\n    description\n    categories {\n      name\n      id\n    }\n    price\n    images {\n      url\n      alt\n    }\n    slug\n  }\n}":
    types.ProductGetBySlugDocument,
  "query ProductsGetList($search: String, $take: Int, $skip: Int) {\n  products(search: $search, take: $take, skip: $skip) {\n    data {\n      id\n      name\n      slug\n      description\n      categories {\n        name\n        id\n      }\n      images {\n        url\n        alt\n      }\n      price\n    }\n    meta {\n      total\n    }\n  }\n}":
    types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query CategoriesGetList {\n  categories {\n    data {\n      name\n      id\n      slug\n      description\n    }\n  }\n}",
): typeof import("./graphql").CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query CategoryGetBySlug($slug: String) {\n  category(slug: $slug) {\n    name\n    description\n    id\n    products {\n      id\n      name\n      slug\n      description\n      categories {\n        name\n        id\n      }\n      images {\n        url\n        alt\n      }\n      price\n    }\n  }\n}",
): typeof import("./graphql").CategoryGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query CollectionGetBySlug($slug: String) {\n  collection(slug: $slug) {\n    name\n    description\n    id\n    products {\n      id\n      name\n      slug\n      description\n      categories {\n        name\n        id\n      }\n      images {\n        url\n        alt\n      }\n      price\n    }\n  }\n}",
): typeof import("./graphql").CollectionGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query CollectionsGetList {\n  collections {\n    data {\n      name\n      id\n      slug\n      description\n    }\n  }\n}",
): typeof import("./graphql").CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query ProductGetBySlug($slug: String) {\n  product(slug: $slug) {\n    id\n    name\n    description\n    categories {\n      name\n      id\n    }\n    price\n    images {\n      url\n      alt\n    }\n    slug\n  }\n}",
): typeof import("./graphql").ProductGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query ProductsGetList($search: String, $take: Int, $skip: Int) {\n  products(search: $search, take: $take, skip: $skip) {\n    data {\n      id\n      name\n      slug\n      description\n      categories {\n        name\n        id\n      }\n      images {\n        url\n        alt\n      }\n      price\n    }\n    meta {\n      total\n    }\n  }\n}",
): typeof import("./graphql").ProductsGetListDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
