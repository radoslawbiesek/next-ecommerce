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
  "mutation CartFindOrCreate($id: Int, $input: CardItemInput) {\n  cartFindOrCreate(id: $id, input: $input) {\n    ...Cart\n  }\n}":
    types.CartFindOrCreateDocument,
  "fragment Cart on Cart {\n  id\n  items {\n    ...CartItem\n  }\n}": types.CartFragmentDoc,
  "query CartGetById($id: Int!) {\n  cart(id: $id) {\n    ...Cart\n  }\n}": types.CartGetByIdDocument,
  "fragment CartItem on CartItem {\n  id\n  productId\n  price\n  variant\n  quantity\n  product {\n    ...ProductListItem\n  }\n}":
    types.CartItemFragmentDoc,
  "mutation CartRemoveItem($cartItemId: Int!) {\n  cartRemoveItem(cartItemId: $cartItemId) {\n    ...CartItem\n  }\n}":
    types.CartRemoveItemDocument,
  "mutation CartUpdateItemQuantity($cartItemId: Int!, $quantity: Int!) {\n  cartUpdateItemQuantity(cartItemId: $cartItemId, quantity: $quantity) {\n    ...CartItem\n  }\n}":
    types.CartUpdateItemQuantityDocument,
  "query CategoriesGetList {\n  categories {\n    data {\n      name\n      slug\n    }\n  }\n}":
    types.CategoriesGetListDocument,
  "query CategoryGetBySlug($slug: String!, $products_take: Int, $products_skip: Int, $products_ordering: String) {\n  category(slug: $slug) {\n    name\n    description\n    id\n    products(\n      take: $products_take\n      skip: $products_skip\n      ordering: $products_ordering\n    ) {\n      data {\n        ...ProductListItem\n      }\n      meta {\n        total\n      }\n    }\n  }\n}":
    types.CategoryGetBySlugDocument,
  "query CollectionGetBySlug($slug: String!, $products_take: Int, $products_skip: Int, $products_ordering: String) {\n  collection(slug: $slug) {\n    name\n    description\n    id\n    products(\n      take: $products_take\n      skip: $products_skip\n      ordering: $products_ordering\n    ) {\n      data {\n        ...ProductListItem\n      }\n      meta {\n        total\n      }\n    }\n  }\n}":
    types.CollectionGetBySlugDocument,
  "query CollectionsGetList {\n  collections {\n    data {\n      name\n      id\n      slug\n      description\n    }\n  }\n}":
    types.CollectionsGetListDocument,
  "mutation OrderUpdateStatus($id: Int, $status: String) {\n  orderUpdateStatus(id: $id, status: $status) {\n    status\n    id\n  }\n}":
    types.OrderUpdateStatusDocument,
  "query ProductGetBySlug($slug: String!) {\n  product(slug: $slug) {\n    ...ProductListItem\n    description\n    variants\n    inStock\n  }\n}":
    types.ProductGetBySlugDocument,
  "fragment ProductListItem on Product {\n  id\n  name\n  slug\n  price\n  rating\n  categories {\n    id\n    name\n    slug\n  }\n  images {\n    url\n    alt\n    width\n    height\n  }\n}":
    types.ProductListItemFragmentDoc,
  "query ProductsGetList($search: String, $take: Int, $skip: Int, $ordering: String) {\n  products(search: $search, take: $take, skip: $skip, ordering: $ordering) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      total\n    }\n  }\n}":
    types.ProductsGetListDocument,
  "query RecommendedProductsGetList($productId: Int!, $take: Int) {\n  recommended_products(productId: $productId, take: $take) {\n    data {\n      ...ProductListItem\n    }\n  }\n}":
    types.RecommendedProductsGetListDocument,
  "mutation ReviewCreate($input: ReviewInput!) {\n  addReview(input: $input) {\n    ...Review\n  }\n}":
    types.ReviewCreateDocument,
  "fragment Review on Review {\n  id\n  headline\n  content\n  rating\n  name\n  email\n  createdAt\n}":
    types.ReviewFragmentDoc,
  "query ReviewsGetList($productId: Int!) {\n  reviews(productId: $productId) {\n    ...Review\n  }\n}":
    types.ReviewsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CartFindOrCreate($id: Int, $input: CardItemInput) {\n  cartFindOrCreate(id: $id, input: $input) {\n    ...Cart\n  }\n}",
): typeof import("./graphql").CartFindOrCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment Cart on Cart {\n  id\n  items {\n    ...CartItem\n  }\n}",
): typeof import("./graphql").CartFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query CartGetById($id: Int!) {\n  cart(id: $id) {\n    ...Cart\n  }\n}",
): typeof import("./graphql").CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment CartItem on CartItem {\n  id\n  productId\n  price\n  variant\n  quantity\n  product {\n    ...ProductListItem\n  }\n}",
): typeof import("./graphql").CartItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CartRemoveItem($cartItemId: Int!) {\n  cartRemoveItem(cartItemId: $cartItemId) {\n    ...CartItem\n  }\n}",
): typeof import("./graphql").CartRemoveItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CartUpdateItemQuantity($cartItemId: Int!, $quantity: Int!) {\n  cartUpdateItemQuantity(cartItemId: $cartItemId, quantity: $quantity) {\n    ...CartItem\n  }\n}",
): typeof import("./graphql").CartUpdateItemQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query CategoriesGetList {\n  categories {\n    data {\n      name\n      slug\n    }\n  }\n}",
): typeof import("./graphql").CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query CategoryGetBySlug($slug: String!, $products_take: Int, $products_skip: Int, $products_ordering: String) {\n  category(slug: $slug) {\n    name\n    description\n    id\n    products(\n      take: $products_take\n      skip: $products_skip\n      ordering: $products_ordering\n    ) {\n      data {\n        ...ProductListItem\n      }\n      meta {\n        total\n      }\n    }\n  }\n}",
): typeof import("./graphql").CategoryGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query CollectionGetBySlug($slug: String!, $products_take: Int, $products_skip: Int, $products_ordering: String) {\n  collection(slug: $slug) {\n    name\n    description\n    id\n    products(\n      take: $products_take\n      skip: $products_skip\n      ordering: $products_ordering\n    ) {\n      data {\n        ...ProductListItem\n      }\n      meta {\n        total\n      }\n    }\n  }\n}",
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
  source: "mutation OrderUpdateStatus($id: Int, $status: String) {\n  orderUpdateStatus(id: $id, status: $status) {\n    status\n    id\n  }\n}",
): typeof import("./graphql").OrderUpdateStatusDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query ProductGetBySlug($slug: String!) {\n  product(slug: $slug) {\n    ...ProductListItem\n    description\n    variants\n    inStock\n  }\n}",
): typeof import("./graphql").ProductGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment ProductListItem on Product {\n  id\n  name\n  slug\n  price\n  rating\n  categories {\n    id\n    name\n    slug\n  }\n  images {\n    url\n    alt\n    width\n    height\n  }\n}",
): typeof import("./graphql").ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query ProductsGetList($search: String, $take: Int, $skip: Int, $ordering: String) {\n  products(search: $search, take: $take, skip: $skip, ordering: $ordering) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      total\n    }\n  }\n}",
): typeof import("./graphql").ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query RecommendedProductsGetList($productId: Int!, $take: Int) {\n  recommended_products(productId: $productId, take: $take) {\n    data {\n      ...ProductListItem\n    }\n  }\n}",
): typeof import("./graphql").RecommendedProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation ReviewCreate($input: ReviewInput!) {\n  addReview(input: $input) {\n    ...Review\n  }\n}",
): typeof import("./graphql").ReviewCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment Review on Review {\n  id\n  headline\n  content\n  rating\n  name\n  email\n  createdAt\n}",
): typeof import("./graphql").ReviewFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query ReviewsGetList($productId: Int!) {\n  reviews(productId: $productId) {\n    ...Review\n  }\n}",
): typeof import("./graphql").ReviewsGetListDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
