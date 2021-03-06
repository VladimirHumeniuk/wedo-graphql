import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    getAllUsers(lastVisible: Int, limit: Int): [User]
    getUser(uid: String!): User

    indexSearch(
      collection: String!,
      query: String!,
      hitsPerPage: Int!,
      page: Int,
      filters: String
    ): SearchResult

    getAllCompanies: [Company]
    getCompany(cid: String): Company
    getCompanyByTitle(title: String): Company

    getAllAlerts: [AlertData]
    getAlerts(uid: String!): [Alert]

    getAllCategories: [Category]
    getPopular: [Popular]
    getCategory(id: Int): Category

    getCompanyComments(cid: String!, query: QueryPayloadInput): [Comment]
    getCompanyStars(cid: String!): [Star]
    getUserStars(uid: String!): [Star]
  }

  type Mutation {
    assignCompany(userId: String!, companyId: String!): Boolean!
    removeCompany(cid: String!): Boolean!

    addAlert(uid: String!, alert: AlertInput!): Boolean!
    removeAlert(code: String!, uid: String!): Boolean!

    removeUser(uid: String!): Boolean!

    addCategory(category: CategoryInput!): Boolean!
    removeCategory(id: Int!): Boolean!
    setStar(star: StarInput!): Boolean!

    setComment(companyId: String!, comment: CommentInput!): Boolean!
    addComment(companyId: String!, comment: CommentInput!): Boolean!
    removeComment(companyId: String!, commentId: String!): Boolean!

    setVote(companyId: String!, commentId: String!, vote: VoteInput!): Boolean!
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

  type CompanyPreview {
    objectID: String!
    title: String!
    image: String
    category: Int!
    shortDescription: String!
    rating: Float
  }

  # Comments
  type Comment {
    id: String
    date: Date
    text: String
    author: CommentAuthor
    isEdited: Boolean
    rating: Float
    answer: Answer
    votes: [Vote]
  }

  input CommentInput {
    id: String
    date: Date
    text: String
    author: CommentAuthorInput
    isEdited: Boolean
    rating: Int
    answer: AnswerInput
  }

  type Answer {
    date: Date
    text: String
    isEdited: Boolean
  }

  input AnswerInput {
    date: Date
    text: String
    isEdited: Boolean
  }

  type CommentAuthor {
    uid: String!
    username: String!
  }

  input CommentAuthorInput {
    uid: String!
    username: String!
  }

  # Vote
  type Vote {
    id: String
    value: Boolean
  }

  input VoteInput {
    id: String
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

  type Popular {
    id: Int
    amount: Int
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

  input StarInput {
    cid: String!
    uid: String!
    value: Int!
  }

  # Search Results
  type SearchResult {
    total: Int!
    hits: [SearchItem]
  }

  # QueryPayload
  input QueryPayloadInput {
      order: OrderPayloadInput
  }

  # OrderPayloadInput
  input OrderPayloadInput {
      fieldName: String!
      direction: String!
  }

  union SearchItem = CompanyPreview
`;