import { type TypedDocumentString } from "@/gql/graphql";

type GraphQLResponse<T> = { data: T; errors?: undefined } | { data?: undefined; errors: { message: string }[] };

export async function executeGraphQL<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  if (!process.env.GRAPHQL_URL) {
    throw new Error("GRAPHQL_URL is not defined");
  }

  const response = await fetch(process.env.GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const graphqlData = (await response.json()) as GraphQLResponse<TResult>;

  if (graphqlData.errors) {
    throw new Error("GraphQL Error", {
      cause: graphqlData.errors,
    });
  }

  return graphqlData.data;
}
