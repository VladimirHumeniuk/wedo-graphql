import { adminService } from '../setup';
import { tryCatchWithApolloErrorAsync } from '../helpers/error-handler.helper';
import { Item } from '../models';
import { Query, CollectionReference } from '@google-cloud/firestore';

export const ItemResolver = {
  Query: {
    async getItems(_: null, { type, search, category }) {
      const collection = type.toLowerCase();
      return await tryCatchWithApolloErrorAsync(async () => {
        let query: CollectionReference | Query = adminService
          .firestore()
          .collection(collection)
          .where('isShown', '==', true)
          .orderBy('created')

        if (category) {
          query = query.where('category', '==', category);
        }

        if (search) {
          query = query.orderBy('title')
            .startAt(search)
            .endAt(search + '\uf8ff')
        }

        const items = await query.get();

        return items.docs.map(doc => doc.data()) as Item[];
      });
    }
  },
  Mutation: {},
  ItemType: {
    __resolveType(obj) {
      if (obj.uid) {
        return 'User';
      }

      if (obj.cid) {
        return 'Company';
      }
    }
  }
}
