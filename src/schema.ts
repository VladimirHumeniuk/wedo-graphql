import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    getAllUsers(lastVisible: Int, limit: Int): [User]
    getUser(uid: String!): User

    getAllCompanies: [Company]
    getCompany(cid: String): Company
    getCompanyByTitle(title: String): Company

    getItems(type: String!, search: String, category: Int): [Item]

    getAllAlerts: [AlertData]
    getAlerts(uid: String!): [Alert]

    getAllCategories: [Category]
    getCategory(id: Int): Category

    getCompanyComments(cid: String!): [Comment]
    getCompanyStars(cid: String!): [Star]

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
    username: String
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
    comments: [Comment]
    category: Int!
    phone: String!
    email: String!
    address: String
    wysiwyg: String
    shortDescription: String!
    isShown: Boolean!
    rating: Float
  }

  # Comments
  type Comment {
    id: String
    date: Date
    text: String
    author: CommentAuthor
    isEdited: Boolean
    rating: Int
    answer: Answer
    votes: [Vote]
  }

  type Answer {
    date: Date
    text: String
    isEdited: Boolean
  }

  type CommentAuthor {
    uid: String!
    username: String!
  }

  type Vote {
    value: Boolean
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

  # Star
  type Star {
    cid: String!
    uid: String!
    value: Int
  }

  # Item
  union Item = Company | User
`;