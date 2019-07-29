import * as admin from 'firebase-admin';
import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

const dotenv = require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  },
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
