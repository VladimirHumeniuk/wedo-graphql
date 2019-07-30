import { ApolloError, ValidationError } from 'apollo-server';
import * as admin from 'firebase-admin';
import { User } from './models';

const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const resolvers = {
  Query: {
    async users() {
      const users = await admin
        .firestore()
        .collection('users')
        .get();
      return users.docs.map(users => users.data()) as User[];
    },
    async user(_: null, args: { uid: string }) {
      try {
        const userDoc = await admin
          .firestore()
          .doc(`users/${args.uid}`)
          .get();
        const user = userDoc.data() as User | undefined;
        return user || new ValidationError('User ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  Mutation: {
    createUser: async (_, args: { uid: string }) => {
      try {
        const userRef = admin.firestore().doc(`users/${args.uid}`)
        let userDoc = await userRef.get()

        const user = userDoc.data() as User

        await userRef.update(user)

        userDoc = await userRef.get()

        return userDoc.data()
      } catch (error) {
        throw new ApolloError(error)
      }
    }
  }
};