"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_resolver_1 = require("./resolvers/User.resolver");
const Company_resolver_1 = require("./resolvers/Company.resolver");
const Item_resolver_1 = require("./resolvers/Item.resolver");
exports.resolvers = {
    Query: Object.assign({}, User_resolver_1.UserResolver.Query, Company_resolver_1.CompanyResolver.Query, Item_resolver_1.ItemResolver.Query),
    Mutation: Object.assign({}, User_resolver_1.UserResolver.Mutation),
    Item: {
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
//# sourceMappingURL=resolvers.js.map