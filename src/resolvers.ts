import { UserResolver } from "./resolvers/User.resolver";


export const resolvers = {
  Query: {
    ...UserResolver
  },
};