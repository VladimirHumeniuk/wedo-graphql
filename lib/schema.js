"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDefs = apollo_server_1.gql `
  type Query {
    users: [User]
    user(uid: String!): User
  }

  # User
  type User {
    uid: ID!
    email: String!
    accountType: String!
    acceptTermsAndConditions: String!
  }

  # Mutation
  type Mutation {
    createUser(uid: ID!): User
  }
`;
//# sourceMappingURL=schema.js.map