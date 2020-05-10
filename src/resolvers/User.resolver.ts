import { ApolloError, ValidationError } from 'apollo-server'
import { User } from '../models';
import { adminService } from '../setup';
import { tryCatchWithApolloErrorAsync } from "./../helpers/error-handler.helper";
import { api } from '../helpers/configuration-provider.helper';


export const UserResolver = {
  Query: {
    async getAllUsers(_: null, { lastVisible, limit }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        const users = await adminService
          .firestore()
          .collection(api.users)
          .orderBy('createdAt')
          .startAfter(lastVisible ? lastVisible : 1)
          .limit(limit ? limit : 0)
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
}