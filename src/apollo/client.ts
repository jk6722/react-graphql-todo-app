import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3001/",
  cache: new InMemoryCache(),
});

export default client;

// client가 있어야지 앱에서 GraphQL API를 사용할 수 있다.
