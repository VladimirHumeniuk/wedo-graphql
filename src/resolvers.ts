import { UserResolver } from './resolvers/User.resolver';
import { AlertResolver } from './resolvers/Alert.resolver';
import { CategoryResolver } from './resolvers/Category.resolver';
import { AlgoliaResolver } from './resolvers/Algolia.resolver';

import { CompanyResolver } from './modules/company/Company.resolver';
import { CommentResolver } from './modules/comment/Comment.resolver';
import { StarResolver } from './modules/star/Star.resolver';
import { VoteResolver } from './modules/vote/Vote.resolver';

const resolverItems = [
  AlgoliaResolver,
  UserResolver,
  CompanyResolver,
  AlertResolver,
  CategoryResolver,
  CommentResolver,
  StarResolver,
  VoteResolver,
]
export const resolvers = {
  Query: {
    ...Object.assign({}, ...resolverItems.map(x => x.Query))
  },
  Mutation: {
    ...Object.assign({}, ...resolverItems.map(x => x.Mutation))
  },
  SearchItem: {
    __resolveType(obj) {
      if(obj.objectID && obj.category){
        return 'CompanyPreview';
      }
    }
  }
};