"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../setup");
const error_handler_helper_1 = require("../helpers/error-handler.helper");
const configuration_provider_helper_1 = require("../helpers/configuration-provider.helper");
exports.AlertResolver = {
    Query: {
        async getAllAlerts(_, args) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const query = await setup_1.adminService
                    .firestore()
                    .collection(configuration_provider_helper_1.api.alerts)
                    .get();
                return query.docs.map(alert => alert.data());
            });
        },
    },
    Mutation: {
        async addAlert(_, { uid, alert }) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                await setup_1.adminService
                    .firestore()
                    .collection(configuration_provider_helper_1.api.alerts)
                    .doc(uid)
                    .set({
                    code: alert.code
                }, { merge: true });
                return true;
            });
        },
        async removeAlert(_, { code, uid }) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                await setup_1.adminService
                    .firestore()
                    .collection(configuration_provider_helper_1.api.alerts)
                    .doc(uid)
                    .update({ [code.toString()]: setup_1.adminService.firestore.FieldValue.delete() });
                return true;
            });
        }
    }
};
//# sourceMappingURL=Alert.resolver.js.map