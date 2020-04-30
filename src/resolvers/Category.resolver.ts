import { ApolloError, ValidationError } from 'apollo-server'
import { Category } from '../models';
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
          .get();
        return categories.docs.map(category => category.data()) as Category[];
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
  Mutation: {}
}