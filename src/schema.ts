import { gql } from 'apollo-server';

export const typeDefs = gql`
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
`;