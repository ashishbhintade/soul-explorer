# Soul Explorer

Live App [Here](https://soul-explorer.netlify.app/).

## What is Soul Explorer

Soul Explorer provides a user friendly interface to explore the soul names i.e., soul name, owner address, and metadata. It also shows the transaction that took place to buy that user name along with some meta data.

## How it is useful for developers

This explorer can be useful for developers in various ways:-

- Data Analysis: This explorer canprovide developers with a comprehensive view of data within the Soulnames. Developers can explore various metrics like distribution of soul names, frequency of specific names and patterns in name generation.
- Debugging and Testing: Developers often encounter issues when working with large datasets or complex systems. By using this explorer, developers can search, filter, and sort through the Soulnames data, making it easier to identify potential errors. They can track down specific names or investigate patterns that might be causing issues, enabling them to debug and test more effectively.
- User Experience Improvement: This explorer can assist developers in understanding how users interact with Soulnames product. By analyzing behavior like most frequently search names, developers can gain insights into user preferences.
- Documentation and Collaboration: Developers often rely on documentation to understand complexity of a project. This explorer can serve as a visual aid for documenting the Soulnames.

## How to get API key

- Visit the Bitquery website at https://ide.bitquery.io/.
- Get your API keys

## Installing and Running

- Clone this repo

```bash
git clone https://github.com/ashishbhintade/soul-explorer.git
```

- Add you own API key from Bitquery

```js
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-API-KEY": "Your_API_KEY",
    },
  };
});
```

- Run the following command in terminal

```bash
npm i && npm start
```

## Working with Apollo Client

- First install dependencies by running the following command in terminal:

```bash
npm install @apollo/client graphql
```

- Import necessary dependencies in your JavaScript file:

```js
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { gql } from "graphql";
```

- Set up client. Create instance of `ApolloClient` by providing options such as `link` and `cache`. We will use `createHttpLink` to create an HTTP link that connects to your GraphQL server:

```js
const httpLink = createHttpLink({
  uri: "https://example.com/graphql", //Your API endpoint
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

- Define a query:

```js
const LOAD_USERS = gql`
  {
    ethereum(network: celo_alfajores) {
      smartContractCalls(
        options: { desc: "block.timestamp.time", limit: 50, offset: 0 }
        smartContractAddress: {
          is: "0xf163686d50C800C49ED58836d3a4D1fBA057CeE6"
        }
        smartContractMethod: { is: "mint" }
      ) {
        block {
          timestamp {
            time(format: "%Y-%m-%d %H:%M:%S")
          }
          height
        }
        transaction {
          hash
        }
        arguments {
          argument
          value
        }
        smartContractMethod {
          name
        }
      }
    }
  }
`;
```

- Execute the query. The `useQuery` hook takes the `LOAD_USERS` query as an argument and returns an object with properties like error and data.

```js
function MyComponent() {
  const { error, data } = useQuery(LOAD_USERS);

  if (error) {
    // Handle the error case
    console.log(error.message);
  }

  // Access the fetched data
  console.log(data);
}
```
