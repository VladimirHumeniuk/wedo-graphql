

export class ConfigurationProvider {
  private static _instance: ConfigurationProvider = undefined;

  public config: Configuration = new Configuration();

  public static get I(): ConfigurationProvider {
    return this._instance = this._instance === undefined
      ? new ConfigurationProvider()
      : this._instance;
  }
}

class Configuration {
  public api = {
    user: "users",
    company: "companies"
  }
}