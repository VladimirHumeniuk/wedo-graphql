"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = require("./resolvers");
const schema_1 = require("./schema");
const setup_1 = require("./setup");
const dotenv = require('dotenv').config();
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    engine: {
        apiKey: process.env.ENGINE_API_KEY
    },
    introspection: true
});
setup_1.initializeServices();
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map