import { ValidationError } from 'apollo-server';
import { SearchIndex } from 'algoliasearch/lite';
import { tryCatchWithApolloErrorAsync } from '../helpers/error-handler.helper';
import { SearchItem } from '../models';
import { algClient } from '../setup';

export const AlgoliaResolver = {
  Query: {
    async indexSearch(_: null, { collection, query = '', filters = undefined, page = 0 }) {
      const algIndex: SearchIndex = algClient.initIndex(collection);

      return await tryCatchWithApolloErrorAsync(async () => {
        const searchResults = algIndex.search(query, {
          page: page,
          hitsPerPage: 16,
          filters: filters
        })

        return (await searchResults).hits as unknown as SearchItem[]
      })
    }
  },
  Mutation: {},
  ItemType: {
    __resolveType(obj) {
      if(obj.objectID && obj.category){
        return 'CompanyPreview';
      }
    }
  }
}