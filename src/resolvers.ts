import { UserResolver } from "./resolvers/User.resolver";
import { CompanyResolver } from "./resolvers/Company.resolver";


export const resolvers = {
  Query: {
    ...UserResolver.Query,
    ...CompanyResolver.Query
  },
  Mutation: {
    ...UserResolver.Mutation
  }
};