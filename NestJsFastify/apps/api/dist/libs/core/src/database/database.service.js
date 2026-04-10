"use strict"
//# sourceMappingURL=database.service.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.DatabaseService = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const node_postgres_1 = require("drizzle-orm/node-postgres")
const pg_1 = require("pg")
const config_1 = require("../config")
const schema = tslib_1.__importStar(
  require("../../../infrastructure/database/src"),
)
let DatabaseService = class DatabaseService {
  constructor(config) {
    this.config = config
  }
  onModuleInit() {
    this.pool = new pg_1.Pool({
      connectionString: this.config.databaseUrl,
    })
    this.db = (0, node_postgres_1.drizzle)(this.pool, { schema })
  }
  async onModuleDestroy() {
    await this.pool.end()
  }
}
exports.DatabaseService = DatabaseService
exports.DatabaseService = DatabaseService = tslib_1.__decorate(
  [
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService]),
  ],
  DatabaseService,
)
