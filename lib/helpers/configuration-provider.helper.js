"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Configuration {
    constructor() {
        this.api = {
            users: 'users',
            companies: 'companies',
            alerts: 'alerts',
            categories: 'categories',
            comments: 'comments',
            votes: 'votes',
            stars: 'stars',
        };
    }
}
class ConfigurationProvider {
    constructor() {
        this.config = new Configuration();
    }
    static get I() {
        return this._instance = this._instance === undefined
            ? new ConfigurationProvider()
            : this._instance;
    }
}
ConfigurationProvider._instance = undefined;
exports.ConfigurationProvider = ConfigurationProvider;
exports.api = ConfigurationProvider.I.config.api;
//# sourceMappingURL=configuration-provider.helper.js.map