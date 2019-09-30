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
                const data = query.docs.map(alert => ({
                    id: alert.id,
                    alerts: Object.values(alert.data())
                }));
                console.log(data);
                return data;
            });
        },
        async getAlerts(_, { uid }) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const query = await setup_1.adminService
                    .firestore()
                    .doc(`${configuration_provider_helper_1.api.alerts}/${uid}`)
                    .get();
                return Object.values(query.data());
            });
        },
    },
    Mutation: {
        async addAlert(_, { uid, alert }) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const copyAlert = Object.assign({}, alert);
                await setup_1.adminService
                    .firestore()
                    .collection(configuration_provider_helper_1.api.alerts)
                    .doc(uid)
                    .set({
                    [copyAlert.code]: copyAlert
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