import { ApolloError, ValidationError } from 'apollo-server'
import { User } from '../models';
import { adminService } from '../setup';


export const UserResolver = {
  Query: {
    async getAllUsers() {
      const users = await adminService
        .firestore()
        .collection('users')
        .get();
      return users.docs.map(user => user.data()) as User[];
    },
    async getUser(_: null, args: { uid: string }) {
      try {
        const userDoc = await adminService
          .firestore()
          .doc(`users/${args.uid}`)
          .get();
        const user = userDoc.data() as User | undefined;
        return user || new ValidationError('User ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
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