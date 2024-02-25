/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Categories = {
  data: Array<CategoryListItem>;
};

export type Category = {
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  products: Products;
  slug: Scalars['String']['output'];
};


export type CategoryProductsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CategoryListItem = {
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type Collection = {
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  products: Products;
  slug: Scalars['String']['output'];
};


export type CollectionProductsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CollectionListItem = {
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type Collections = {
  data: Array<CollectionListItem>;
};

export type Image = {
  alt?: Maybe<Scalars['String']['output']>;
  height: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type Meta = {
  total: Scalars['Int']['output'];
};

export type Product = {
  categories: Array<Category>;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images: Array<Image>;
  inStock: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  variants: Array<Scalars['String']['output']>;
};

export type Products = {
  data: Array<Product>;
  meta: Meta;
};

export type Query = {
  categories?: Maybe<Categories>;
  category?: Maybe<Category>;
  collection?: Maybe<Collection>;
  collections?: Maybe<Collections>;
  product?: Maybe<Product>;
  products?: Maybe<Products>;
};


export type QueryCategoryArgs = {
  slug: Scalars['String']['input'];
};


export type QueryCollectionArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProductArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CategoriesGetListQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesGetListQuery = { categories?: { data: Array<{ name: string, slug: string }> } | null };

export type CategoryGetBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  products_take?: InputMaybe<Scalars['Int']['input']>;
  products_skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CategoryGetBySlugQuery = { category?: { name: string, description?: string | null, id: number, products: { data: Array<{ id: number, name: string, slug: string, price: number, rating: number, categories: Array<{ id: number, name: string, slug: string }>, images: Array<{ url: string, alt?: string | null, width: number, height: number }> }>, meta: { total: number } } } | null };

export type CollectionGetBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  products_take?: InputMaybe<Scalars['Int']['input']>;
  products_skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CollectionGetBySlugQuery = { collection?: { name: string, description?: string | null, id: number, products: { data: Array<{ id: number, name: string, slug: string, price: number, rating: number, categories: Array<{ id: number, name: string, slug: string }>, images: Array<{ url: string, alt?: string | null, width: number, height: number }> }>, meta: { total: number } } } | null };

export type CollectionsGetListQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionsGetListQuery = { collections?: { data: Array<{ name: string, id: number, slug: string, description?: string | null, imageUrl: string }> } | null };

export type ProductGetBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductGetBySlugQuery = { product?: { description: string, variants: Array<string>, inStock: number, id: number, name: string, slug: string, price: number, rating: number, categories: Array<{ id: number, name: string, slug: string }>, images: Array<{ url: string, alt?: string | null, width: number, height: number }> } | null };

export type ProductListItemFragment = { id: number, name: string, slug: string, price: number, rating: number, categories: Array<{ id: number, name: string, slug: string }>, images: Array<{ url: string, alt?: string | null, width: number, height: number }> };

export type ProductsGetListQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductsGetListQuery = { products?: { data: Array<{ id: number, name: string, slug: string, price: number, rating: number, categories: Array<{ id: number, name: string, slug: string }>, images: Array<{ url: string, alt?: string | null, width: number, height: number }> }>, meta: { total: number } } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const ProductListItemFragmentDoc = new TypedDocumentString(`
    fragment ProductListItem on Product {
  id
  name
  slug
  price
  rating
  categories {
    id
    name
    slug
  }
  images {
    url
    alt
    width
    height
  }
}
    `, {"fragmentName":"ProductListItem"}) as unknown as TypedDocumentString<ProductListItemFragment, unknown>;
export const CategoriesGetListDocument = new TypedDocumentString(`
    query CategoriesGetList {
  categories {
    data {
      name
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<CategoriesGetListQuery, CategoriesGetListQueryVariables>;
export const CategoryGetBySlugDocument = new TypedDocumentString(`
    query CategoryGetBySlug($slug: String!, $products_take: Int, $products_skip: Int) {
  category(slug: $slug) {
    name
    description
    id
    products(take: $products_take, skip: $products_skip) {
      data {
        ...ProductListItem
      }
      meta {
        total
      }
    }
  }
}
    fragment ProductListItem on Product {
  id
  name
  slug
  price
  rating
  categories {
    id
    name
    slug
  }
  images {
    url
    alt
    width
    height
  }
}`) as unknown as TypedDocumentString<CategoryGetBySlugQuery, CategoryGetBySlugQueryVariables>;
export const CollectionGetBySlugDocument = new TypedDocumentString(`
    query CollectionGetBySlug($slug: String!, $products_take: Int, $products_skip: Int) {
  collection(slug: $slug) {
    name
    description
    id
    products(take: $products_take, skip: $products_skip) {
      data {
        ...ProductListItem
      }
      meta {
        total
      }
    }
  }
}
    fragment ProductListItem on Product {
  id
  name
  slug
  price
  rating
  categories {
    id
    name
    slug
  }
  images {
    url
    alt
    width
    height
  }
}`) as unknown as TypedDocumentString<CollectionGetBySlugQuery, CollectionGetBySlugQueryVariables>;
export const CollectionsGetListDocument = new TypedDocumentString(`
    query CollectionsGetList {
  collections {
    data {
      name
      id
      slug
      description
      imageUrl
    }
  }
}
    `) as unknown as TypedDocumentString<CollectionsGetListQuery, CollectionsGetListQueryVariables>;
export const ProductGetBySlugDocument = new TypedDocumentString(`
    query ProductGetBySlug($slug: String!) {
  product(slug: $slug) {
    ...ProductListItem
    description
    variants
    inStock
  }
}
    fragment ProductListItem on Product {
  id
  name
  slug
  price
  rating
  categories {
    id
    name
    slug
  }
  images {
    url
    alt
    width
    height
  }
}`) as unknown as TypedDocumentString<ProductGetBySlugQuery, ProductGetBySlugQueryVariables>;
export const ProductsGetListDocument = new TypedDocumentString(`
    query ProductsGetList($search: String, $take: Int, $skip: Int) {
  products(search: $search, take: $take, skip: $skip) {
    data {
      ...ProductListItem
    }
    meta {
      total
    }
  }
}
    fragment ProductListItem on Product {
  id
  name
  slug
  price
  rating
  categories {
    id
    name
    slug
  }
  images {
    url
    alt
    width
    height
  }
}`) as unknown as TypedDocumentString<ProductsGetListQuery, ProductsGetListQueryVariables>;