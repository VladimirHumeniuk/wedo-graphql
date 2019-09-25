"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDefs = apollo_server_1.gql `
  type Query {
    getAllUsers: [User]
    getUser(uid: String!): User
    getAllCompanies: [Company]
    getCompany(cid: String!): Company
    getItems(type: String!, search: String, category: String): [Item]
  }

  type Mutation {
    assignCompany(userId: String!, companyId: String!): Boolean!
  }

  # User
  type User {
    uid: ID!
    email: String!
    accountType: String!
    acceptTermsAndConditions: String!
  }

  scalar Date

  # Company Card
  type Company {
    cid: String!
    title: String!
    owner: String!
    created: Date!
    image: String
    url: String
    category: String!
    phone: PhoneNumber
    email: String
    address: String
    wysiwyg: String
    shortDescription: String!
    isShown: Boolean!
  }

  type PhoneNumber {
    isValid: Boolean
  }

  # Item
  union Item = Company | User
`;
//# sourceMappingURL=schema.js.map