import { ApolloServer } from 'apollo-server';

import MainModule from './modules/index.module';

export const server = new ApolloServer({
  schema: MainModule.schema,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
