import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import GetSoulNames from "./Components/GetSoulNames";

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      return alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://graphql.bitquery.io" }),
]);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-API-KEY": "BQYREgYRrtF30XWbLmzyYS7lWoDuvkVJ",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GetSoulNames />
    </ApolloProvider>
  );
}

export default App;
