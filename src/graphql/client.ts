import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://sandbox-api-test.samyroad.com/graphql',
  cache: new InMemoryCache(),
});

export default client;