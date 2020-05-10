"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const setup_1 = require("../setup");
const error_handler_helper_1 = require("./../helpers/error-handler.helper");
const configuration_provider_helper_1 = require("../helpers/configuration-provider.helper");
exports.UserResolver = {
    Query: {
        async getAllUsers(_, { lastVisible, limit }) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const users = await setup_1.adminService
                    .firestore()
                    .collection(configuration_provider_helper_1.api.users)
                    .orderBy('createdAt')
                    .startAfter(lastVisible ? lastVisible : 1)
                    .limit(limit ? limit : 0)
                    .get();
                return users.docs.map(user => user.data());
            });
        },
        async getUser(_, args) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const userDoc = await setup_1.adminService
                    .firestore()
                    .doc(`${configuration_provider_helper_1.api.users}/${args.uid}`)
                    .get();
                const user = userDoc.data();
                return user || new apollo_server_1.ValidationError('User ID not found');
            });
        },
    },
    Mutation: {
        async removeUser(_, { uid }) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const userDoc = await setup_1.adminService
                    .firestore()
                    .doc(`${configuration_provider_helper_1.api.users}/${uid}`)
                    .get();
                setup_1.adminService.auth().deleteUser(uid);
                userDoc.ref.delete();
                return true;
            });
        }
    }
};
//# sourceMappingURL=User.resolver.js.map