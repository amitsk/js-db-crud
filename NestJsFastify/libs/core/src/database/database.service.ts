import { Injectable, OnModuleInit } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { ConfigService } from "../config";
import * as schema from "../../../infrastructure/database/src";

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool!: Pool;
  db!: ReturnType<typeof drizzle>;

  constructor(private config: ConfigService) {}

  onModuleInit() {
    this.pool = new Pool({
      connectionString: this.config.databaseUrl,
    });

    this.db = drizzle(this.pool, { schema });
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
