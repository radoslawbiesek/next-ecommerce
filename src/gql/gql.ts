/* eslint-disable */
import * as types from './graphql';



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
    "query CategoriesGetList {\n  categories {\n    data {\n      name\n      slug\n    }\n  }\n}": types.CategoriesGetListDocument,
    "query CategoryGetBySlug($slug: String!) {\n  category(slug: $slug) {\n    name\n    description\n    id\n    products {\n      data {\n        ...ProductListItem\n        ...ProductImages\n      }\n      meta {\n        total\n      }\n    }\n  }\n}": types.CategoryGetBySlugDocument,
    "query CollectionGetBySlug($slug: String!) {\n  collection(slug: $slug) {\n    name\n    description\n    id\n    products {\n      data {\n        ...ProductListItem\n        ...ProductImages\n      }\n      meta {\n        total\n      }\n    }\n  }\n}": types.CollectionGetBySlugDocument,
    "query CollectionsGetList {\n  collections {\n    data {\n      name\n      id\n      slug\n      description\n    }\n  }\n}": types.CollectionsGetListDocument,
    "query ProductGetBySlug($slug: String!) {\n  product(slug: $slug) {\n    ...ProductListItem\n    ...ProductImages\n    description\n  }\n}": types.ProductGetBySlugDocument,
    "fragment ProductImages on Product {\n  images {\n    url\n    alt\n    width\n    height\n  }\n}": types.ProductImagesFragmentDoc,
    "fragment ProductListItem on Product {\n  id\n  name\n  slug\n  price\n}": types.ProductListItemFragmentDoc,
    "query ProductsGetList($search: String, $take: Int, $skip: Int) {\n  products(search: $search, take: $take, skip: $skip) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      total\n    }\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetList {\n  categories {\n    data {\n      name\n      slug\n    }\n  }\n}"): typeof import('./graphql').CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryGetBySlug($slug: String!) {\n  category(slug: $slug) {\n    name\n    description\n    id\n    products {\n      data {\n        ...ProductListItem\n        ...ProductImages\n      }\n      meta {\n        total\n      }\n    }\n  }\n}"): typeof import('./graphql').CategoryGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionGetBySlug($slug: String!) {\n  collection(slug: $slug) {\n    name\n    description\n    id\n    products {\n      data {\n        ...ProductListItem\n        ...ProductImages\n      }\n      meta {\n        total\n      }\n    }\n  }\n}"): typeof import('./graphql').CollectionGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections {\n    data {\n      name\n      id\n      slug\n      description\n    }\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetBySlug($slug: String!) {\n  product(slug: $slug) {\n    ...ProductListItem\n    ...ProductImages\n    description\n  }\n}"): typeof import('./graphql').ProductGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductImages on Product {\n  images {\n    url\n    alt\n    width\n    height\n  }\n}"): typeof import('./graphql').ProductImagesFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  slug\n  price\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($search: String, $take: Int, $skip: Int) {\n  products(search: $search, take: $take, skip: $skip) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      total\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
