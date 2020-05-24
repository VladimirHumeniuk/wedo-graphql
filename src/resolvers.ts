import { UserResolver } from "./resolvers/User.resolver";
import { ItemResolver } from "./resolvers/Item.resolver";
import { AlertResolver } from "./resolvers/Alert.resolver";
import { CategoryResolver } from "./resolvers/Category.resolver";

import { CompanyResolver } from "./modules/company/Company.resolver";
import { CommentResolver } from './modules/comment/Comment.resolver';
import { StarResolver } from './modules/star/Star.resolver';

const resolverItems = [
  UserResolver,
  CompanyResolver,
  ItemResolver,
  AlertResolver,
  CategoryResolver,
  CommentResolver,
  StarResolver,
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