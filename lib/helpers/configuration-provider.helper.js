"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class Configuration {
    constructor() {
        this.api = {
            user: "users",
            company: "companies"
        };
    }
}
//# sourceMappingURL=configuration-provider.helper.js.map