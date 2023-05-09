import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

// Set up the Apollo Client
export const graphqlClient = new ApolloClient({
  link: new HttpLink({  uri: "http://localhost:4000/cubejs-api/graphql", fetch }),
  cache: new InMemoryCache(),
});
