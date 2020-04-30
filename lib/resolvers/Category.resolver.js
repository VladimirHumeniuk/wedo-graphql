"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const setup_1 = require("../setup");
const error_handler_helper_1 = require("./../helpers/error-handler.helper");
const configuration_provider_helper_1 = require("../helpers/configuration-provider.helper");
exports.CategoryResolver = {
    Query: {
        async getAllCategories() {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const categories = await setup_1.adminService
                    .firestore()
                    .collection(configuration_provider_helper_1.api.categories)
                    .get();
                return categories.docs.map(category => category.data());
            });
        },
        async getCategory(_, args) {
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                const categoryDoc = await setup_1.adminService
                    .firestore()
                    .doc(`${configuration_provider_helper_1.api.categories}/${args.id}`)
                    .get();
                const category = categoryDoc.data();
                return category || new apollo_server_1.ValidationError('Category ID not found');
            });
        },
    },
    Mutation: {}
};
//# sourceMappingURL=Category.resolver.js.map