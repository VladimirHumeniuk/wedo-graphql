"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const setup_1 = require("../setup");
exports.UserResolver = {
    Query: {
        async getAllUsers() {
            const users = await setup_1.adminService
                .firestore()
                .collection('users')
                .get();
            return users.docs.map(user => user.data());
        },
        async getUser(_, args) {
            try {
                const userDoc = await setup_1.adminService
                    .firestore()
                    .doc(`users/${args.uid}`)
                    .get();
                const user = userDoc.data();
                return user || new apollo_server_1.ValidationError('User ID not found');
            }
            catch (error) {
                throw new apollo_server_1.ApolloError(error);
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
};
//# sourceMappingURL=User.resolver.js.map