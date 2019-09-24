"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const setup_1 = require("../setup");
const error_handler_helper_1 = require("./../helpers/error-handler.helper");
const configuration_provider_helper_1 = require("../helpers/configuration-provider.helper");
const api = configuration_provider_helper_1.ConfigurationProvider.I.config.api;
exports.UserResolver = {
    Query: {
        async getAllUsers() {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const users = await setup_1.adminService
                    .firestore()
                    .collection(api.user)
                    .get();
                return users.docs.map(user => user.data());
            });
        },
        async getUser(_, args) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const userDoc = await setup_1.adminService
                    .firestore()
                    .doc(`${api.user}/${args.uid}`)
                    .get();
                const user = userDoc.data();
                return user || new apollo_server_1.ValidationError('User ID not found');
            });
        }
    },
    Mutation: {
        async assignCompany(_, { userId, companyId }) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const userRef = setup_1.adminService.firestore().collection(api.user).doc(userId);
                const companyRef = setup_1.adminService.firestore().collection(api.company).doc(companyId);
                console.log(await userRef.set({ company: companyId }, { merge: true }));
                console.log(await companyRef.set({ cid: companyId }, { merge: true }));
                return true;
            });
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