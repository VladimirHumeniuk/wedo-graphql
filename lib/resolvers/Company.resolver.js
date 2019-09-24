"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const setup_1 = require("../setup");
exports.CompanyResolver = {
    Query: {
        async getAllCompanies(_, args) {
            try {
                const companiesQuery = await setup_1.adminService
                    .firestore()
                    .collection('companies')
                    .get();
                return companiesQuery.docs.map(company => company.data());
            }
            catch (error) {
                throw new apollo_server_1.ApolloError(error);
            }
        },
        async getCompany(_, args) {
            try {
                const companyDoc = await setup_1.adminService
                    .firestore()
                    .doc(`companies/${args.cid}`)
                    .get();
                const company = companyDoc.data();
                return company || new apollo_server_1.ValidationError('Company ID not found');
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
//# sourceMappingURL=Company.resolver.js.map