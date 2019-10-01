import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    getAllUsers: [User]
    getUser(uid: String!): User

    getAllCompanies: [Company]
    getCompany(cid: String): Company

    getItems(type: String!, search: String, category: String): [Item]

    getAllAlerts: [AlertData]
    getAlerts(uid: String!): [Alert]
  }

  type Mutation {
    assignCompany(userId: String!, companyId: String!): Boolean!

    addAlert(uid: String!, alert: AlertInput!): Boolean!
    removeAlert(code: String!, uid: String!): Boolean!
  }

  # User
  type User {
    uid: ID!
    email: String!
    accountType: String!
    acceptTermsAndConditions: String!
    emailVerified: Boolean
    company: String
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
    phone: String!
    email: String!
    address: String
    wysiwyg: String
    shortDescription: String!
    isShown: Boolean!
  }

  type AlertData {
    id: String
    alerts: [Alert]
  }

  type Alert {
    code: String
    status: String
    message: String
    adviseUrl: String
    closable: Boolean
  }

  input AlertInput {
    code: String!
    status: String!
    message: String!
    adviseUrl: String
    closable: Boolean
  }

  # Item
  union Item = Company | User
`;