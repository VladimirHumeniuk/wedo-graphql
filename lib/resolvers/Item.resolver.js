"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../setup");
const error_handler_helper_1 = require("../helpers/error-handler.helper");
exports.ItemResolver = {
    Query: {
        async getItems(_, { type, search, category }) {
            const collection = type.toLowerCase();
            return await error_handler_helper_1.tryCatchWithApolloErrorAsync(async () => {
                let query = setup_1.adminService
                    .firestore()
                    .collection(collection);
                if (category) {
                    query = query.where('category', '==', category);
                }
                if (search) {
                    query = query.orderBy('title')
                        .startAt(search)
                        .endAt(search + '\uf8ff');
                }
                const items = await query.get();
                return items.docs.map(doc => doc.data());
            });
        }
    },
    Mutation: {},
    ItemType: {
        __resolveType(obj) {
            if (obj.uid) {
                return 'User';
            }
            if (obj.cid) {
                return 'Company';
            }
        }
    }
};
//# sourceMappingURL=Item.resolver.js.map