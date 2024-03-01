import { type TypedDocumentString } from "@/gql/graphql";

type GraphQLResponse<T> = { data: T; errors?: undefined } | { data?: undefined; errors: { message: string }[] };

export async function executeGraphQL<TResult, TVariables>({
  query,
  variables,
  cache,
  next,
  headers,
}: {
  query: TypedDocumentString<TResult, TVariables>;
  cache?: RequestCache;
  headers?: HeadersInit;
  next?: NextFetchRequestConfig | undefined;
} & (TVariables extends { [key: string]: never }
  ? { variables?: never }
  : { variables: TVariables })): Promise<TResult> {
  if (!process.env.GRAPHQL_URL) {
    throw new Error("GRAPHQL_URL is not defined");
  }

  const response = await fetch(process.env.GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache,
    next,
  });

  const graphqlData = (await response.json()) as GraphQLResponse<TResult>;

  if (graphqlData.errors) {
    throw new Error("GraphQL Error", {
      cause: graphqlData.errors,
    });
  }

  return graphqlData.data;
}
