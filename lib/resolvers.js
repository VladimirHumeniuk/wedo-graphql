"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_resolver_1 = require("./resolvers/User.resolver");
const Item_resolver_1 = require("./resolvers/Item.resolver");
const Alert_resolver_1 = require("./resolvers/Alert.resolver");
const Category_resolver_1 = require("./resolvers/Category.resolver");
const Company_resolver_1 = require("./modules/company/Company.resolver");
const Comment_resolver_1 = require("./modules/comment/Comment.resolver");
const Star_resolver_1 = require("./modules/star/Star.resolver");
const Vote_resolver_1 = require("./modules/vote/Vote.resolver");
const resolverItems = [
    User_resolver_1.UserResolver,
    Company_resolver_1.CompanyResolver,
    Item_resolver_1.ItemResolver,
    Alert_resolver_1.AlertResolver,
    Category_resolver_1.CategoryResolver,
    Comment_resolver_1.CommentResolver,
    Star_resolver_1.StarResolver,
    Vote_resolver_1.VoteResolver,
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