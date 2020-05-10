"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const setup_1 = require("../setup");
const error_handler_helper_1 = require("../helpers/error-handler.helper");
const configuration_provider_helper_1 = require("../helpers/configuration-provider.helper");
exports.CompanyResolver = {
    Query: {
        async getAllCompanies(_, args) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const companiesQuery = await setup_1.adminService
                    .firestore()
                    .collection(configuration_provider_helper_1.api.companies)
                    .get();
                return companiesQuery.docs.map(company => company.data());
            });
        },
        async getCompany(_, { cid = null }) {
            if (!cid)
                return null;
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const companyDoc = await setup_1.adminService
                    .firestore()
                    .doc(`${configuration_provider_helper_1.api.companies}/${cid}`)
                    .get();
                const company = companyDoc.data();
                return company || new apollo_server_1.ValidationError('Company ID not found');
            });
        }
    },
    Mutation: {
        async assignCompany(_, { userId, companyId }) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const userRef = setup_1.adminService.firestore().collection(configuration_provider_helper_1.api.users).doc(userId);
                const companyRef = setup_1.adminService.firestore().collection(configuration_provider_helper_1.api.companies).doc(companyId);
                await userRef.set({ company: companyId }, { merge: true });
                await companyRef.set({ cid: companyId }, { merge: true });
                return true;
            });
        },
        async removeCompany(_, { cid }) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                await setup_1.adminService
                    .firestore()
                    .collection(configuration_provider_helper_1.api.companies)
                    .doc(`${cid}`)
                    .delete();
                return true;
            });
        }
    }
};
//# sourceMappingURL=Company.resolver.js.map