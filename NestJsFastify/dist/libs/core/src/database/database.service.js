import { __decorate } from "tslib";
import { Injectable } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../../infrastructure/database/src";
let DatabaseService = class DatabaseService {
    constructor(config) {
        this.config = config;
    }
    onModuleInit() {
        this.pool = new Pool({
            connectionString: this.config.databaseUrl,
        });
        this.db = drizzle(this.pool, { schema });
    }
    async onModuleDestroy() {
        await this.pool.end();
    }
};
DatabaseService = __decorate([
    Injectable()
], DatabaseService);
export { DatabaseService };
//# sourceMappingURL=database.service.js.map