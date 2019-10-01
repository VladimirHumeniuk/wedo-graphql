import { ApolloError, ValidationError } from 'apollo-server'
import { User } from '../models';
import { adminService } from '../setup';
import { tryCatchWithApolloErrorAsync } from "./../helpers/error-handler.helper";
import { api } from '../helpers/configuration-provider.helper';


export const UserResolver = {
  Query: {

    async getAllUsers() {
      return await tryCatchWithApolloErrorAsync(async () => {
        const users = await adminService
          .firestore()
          .collection(api.users)
          .get();
        return users.docs.map(user => user.data()) as User[];
      })
    },

    async getUser(_: null, args: { uid: string }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        const userDoc = await adminService
          .firestore()
          .doc(`${api.users}/${args.uid}`)
          .get();
        const user = userDoc.data() as User | undefined;
        return user || new ValidationError('User ID not found');
      })
    },
  },
  Mutation: {
    async assignCompany(_: null, { userId, companyId }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        const userRef = adminService.firestore().collection(api.users).doc(userId);
        const companyRef = adminService.firestore().collection(api.companies).doc(companyId);

        await userRef.set({ company: companyId }, { merge: true });
        await companyRef.set({ cid: companyId }, { merge: true });

        return true;
      })
    },
    async removeUser(_: null, { uid }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        const userDoc = await adminService
          .firestore()
          .doc(`${api.users}/${uid}`)
          .get();

        adminService.auth().deleteUser(uid);
        userDoc.ref.delete();
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