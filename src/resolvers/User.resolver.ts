import { ApolloError, ValidationError } from 'apollo-server'
import { User } from '../models';
import { adminService } from '../setup';
import { tryCatchWithApolloErrorAsync } from "./../helpers/error-handler.helper";
import { ConfigurationProvider } from '../helpers/configuration-provider.helper';

const api = ConfigurationProvider.I.config.api;
export const UserResolver = {
  Query: {

    async getAllUsers() {
      return await tryCatchWithApolloErrorAsync(async () => {
        const users = await adminService
          .firestore()
          .collection(api.user)
          .get();
        return users.docs.map(user => user.data()) as User[];
      })
    },

    async getUser(_: null, args: { uid: string }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        const userDoc = await adminService
          .firestore()
          .doc(`${api.user}/${args.uid}`)
          .get();
        const user = userDoc.data() as User | undefined;
        return user || new ValidationError('User ID not found');
      })
    }
  },
  Mutation: {
    async assignCompany(_: null, { userId, companyId }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        const userRef = adminService.firestore().collection(api.user).doc(userId);
        const companyRef = adminService.firestore().collection(api.company).doc(companyId);

        console.log(await userRef.set({ company: companyId }, { merge: true }))
        console.log(await companyRef.set({ cid: companyId }, { merge: true }))

        return true;
      })
    }
  }
  // async auth(_: null, args: any) {
  //   try {
  //     const auth = await admin.auth;
  //     return auth;
  //   } catch(error) {
  //     throw new ApolloError(error)
  //   }
  // }
}