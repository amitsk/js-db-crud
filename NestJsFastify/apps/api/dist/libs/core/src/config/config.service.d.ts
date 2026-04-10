export declare class ConfigService {
  private config
  constructor()
  get nodeEnv(): "development" | "production" | "test"
  get port(): number
  get host(): string
  get databaseUrl(): string
  get isDevelopment(): boolean
  get isProduction(): boolean
  get isTest(): boolean
}
