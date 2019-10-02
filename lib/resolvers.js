"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_resolver_1 = require("./resolvers/User.resolver");
const Company_resolver_1 = require("./resolvers/Company.resolver");
const Item_resolver_1 = require("./resolvers/Item.resolver");
const Alert_resolver_1 = require("./resolvers/Alert.resolver");
const resolverItems = [
    User_resolver_1.UserResolver,
    Company_resolver_1.CompanyResolver,
    Item_resolver_1.ItemResolver,
    Alert_resolver_1.AlertResolver
];
exports.resolvers = {
    Query: Object.assign({}, Object.assign({}, ...resolverItems.map(x => x.Query))),
    Mutation: Object.assign({}, Object.assign({}, ...resolverItems.map(x => x.Mutation))),
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