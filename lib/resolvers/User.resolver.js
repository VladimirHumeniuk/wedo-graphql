"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const admin = require("firebase-admin");
const serviceAccount = require('../../service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
exports.UserResolver = {
    async users() {
        const users = await admin
            .firestore()
            .collection('users')
            .get();
        return users.docs.map(users => users.data());
    },
    async user(_, args) {
        try {
            const userDoc = await admin
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
};
//# sourceMappingURL=User.resolver.js.map