import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    getAllUsers(lastVisible: Int, limit: Int): [User]
    getUser(uid: String!): User

    getAllCompanies: [Company]
    getCompany(cid: String): Company

    getItems(type: String!, search: String, category: Int): [Item]

    getAllAlerts: [AlertData]
    getAlerts(uid: String!): [Alert]

    getAllCategories: [Category]
    getCategory(id: Int): Category
  }

  type Mutation {
    assignCompany(userId: String!, companyId: String!): Boolean!
    removeCompany(cid: String!): Boolean!

    addAlert(uid: String!, alert: AlertInput!): Boolean!
    removeAlert(code: String!, uid: String!): Boolean!

    removeUser(uid: String!): Boolean!

    addCategory(category: CategoryInput!): Boolean!
    removeCategory(id: Int!): Boolean!
  }

  # Roles
  type Roles {
    readonly: Boolean!
    author: Boolean
    admin: Boolean
  }

  # User
  type User {
    uid: ID!
    email: String!
    accountType: String!
    acceptTermsAndConditions: String!
    emailVerified: Boolean
    company: String
    createdAt: Date
    roles: Roles!
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
    category: Int!
    phone: String!
    email: String!
    address: String
    wysiwyg: String
    shortDescription: String!
    isShown: Boolean!
  }

  # Alerts
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

  # Categories
  type Category {
    id: Int
    title: String
  }

  input CategoryInput {
    id: Int!
    title: String!
  }

  # Item
  union Item = Company | User
`;