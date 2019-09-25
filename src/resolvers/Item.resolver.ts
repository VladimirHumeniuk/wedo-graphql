
import { adminService } from '../setup';
import { tryCatchWithApolloErrorAsync } from '../helpers/error-handler.helper';
import { Item } from '../models/Item';

export const ItemResolver = {
  Query: {
    async getItems(_: null, { type, search, category }) {

      return await tryCatchWithApolloErrorAsync(async () => {
        const query = adminService
          .firestore()
          .collection(type)

        if (category && category !== 'All') {
          query.where('category', '==', category)
        }

        if (search) {
          query.orderBy('title')
            .startAt(search)
            .endAt(search + '\uf8ff')
        }

        const items = await query.get();

        return items.docs.map(doc => doc.data()) as Item[];
      });
    }
  },
  ItemType: {
    __resolveType(obj) {
      if(obj.uid){
        return 'User';
      }
  
      if(obj.cid){
        return 'Company';
      }
    }
  }
}
