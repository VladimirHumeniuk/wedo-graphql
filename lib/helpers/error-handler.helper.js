"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.tryCatchWithApolloErrorAsync = async (bodyFnAsync) => {
    try {
        return await bodyFnAsync();
    }
    catch (error) {
        throw new apollo_server_1.ApolloError(error);
    }
};
exports.tryCatchWithApolloError = (bodyFn) => {
    try {
        return bodyFn();
    }
    catch (error) {
        throw new apollo_server_1.ApolloError(error);
    }
};
//# sourceMappingURL=error-handler.helper.js.map