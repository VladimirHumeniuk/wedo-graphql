

class Configuration {
  public api = {
    users: "users",
    companies: "companies",
    alerts: "alerts"
  }
}

export class ConfigurationProvider {
  private static _instance: ConfigurationProvider = undefined;

  public config: Configuration = new Configuration();

  public static get I(): ConfigurationProvider {
    return this._instance = this._instance === undefined
      ? new ConfigurationProvider()
      : this._instance;
  }
}

export const api = ConfigurationProvider.I.config.api;