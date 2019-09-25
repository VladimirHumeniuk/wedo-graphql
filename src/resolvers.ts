import { UserResolver } from "./resolvers/User.resolver";
import { CompanyResolver } from "./resolvers/Company.resolver";
import { ItemResolver } from "./resolvers/Item.resolver";

export const resolvers = {
  Query: {
    ...UserResolver.Query,
    ...CompanyResolver.Query,
    ...ItemResolver.Query
  },
  Mutation: {
    ...UserResolver.Mutation
  },
  Item: {
    __resolveType(obj) {
      if(obj.uid){
        return 'User';
      }
  
      if(obj.cid){
        return 'Company';
      }
    }
  }
};