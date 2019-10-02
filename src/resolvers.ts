import { UserResolver } from "./resolvers/User.resolver";
import { CompanyResolver } from "./resolvers/Company.resolver";
import { ItemResolver } from "./resolvers/Item.resolver";
import { AlertResolver } from "./resolvers/Alert.resolver";

const resolverItems = [
  UserResolver,
  CompanyResolver,
  ItemResolver,
  AlertResolver
]
export const resolvers = {
  Query: {
    ...Object.assign({}, ...resolverItems.map(x => x.Query))
  },
  Mutation: {
    ...Object.assign({}, ...resolverItems.map(x => x.Mutation))
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