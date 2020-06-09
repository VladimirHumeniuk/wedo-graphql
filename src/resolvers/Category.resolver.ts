import { ApolloError, ValidationError } from 'apollo-server'
import { Category, Popular } from '../models';
import { adminService } from '../setup';
import { tryCatchWithApolloErrorAsync } from "./../helpers/error-handler.helper";
import { api } from '../helpers/configuration-provider.helper';

export const CategoryResolver = {
  Query: {
    async getAllCategories() {
      return await tryCatchWithApolloErrorAsync(async () => {
        const categories = await adminService
          .firestore()
          .collection(api.categories)
          .orderBy('title')
          .get();
        return categories.docs.map(category => category.data()) as Category[];
      })
    },

    async getPopular() {
      return await tryCatchWithApolloErrorAsync(async () => {
        const popular = await adminService
          .firestore()
          .collection(api.counters)
          .doc('companies-by-categories')
          .collection('categories')
          .get()

        let arr: Popular[] = await []

        const getCount = (ref): Promise<number> => {
          const shardsRef = ref.collection('shards').get()

          return shardsRef.then(snapshot => {
            let total_count = 0;

            snapshot.forEach(doc => {
              total_count += doc.data().count;
            });

            return total_count;
          })
        }

        for (const element of popular.docs) {
          const count = await getCount(element.ref)
          if (count > 0) {
            arr.push({
              id: parseInt(element.id),
              amount: count
            })
          }
        }

        await arr.sort((a,b) => b.amount - a.amount)

        return arr
      })
    },

    async getCategory(_: null, args: { id: number }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        const categoryDoc = await adminService
          .firestore()
          .doc(`${api.categories}/${args.id}`)
          .get();
        const category = categoryDoc.data() as Category | undefined;
        return category || new ValidationError('Category ID not found');
      })
    },
  },
  Mutation: {
    async addCategory(_: null, { category }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        await adminService
          .firestore()
          .collection(api.categories)
          .doc(`${category.id}`)
          .set(category, { merge: true });
        return true;
      });
    },
    async removeCategory(_: null, { id }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        await adminService
          .firestore()
          .collection(api.categories)
          .doc(`${id}`)
          .delete()

        return true;
      });
    }
  }
}