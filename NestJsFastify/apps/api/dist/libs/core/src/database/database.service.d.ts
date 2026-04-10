import { OnModuleInit } from "@nestjs/common"
import { drizzle } from "drizzle-orm/node-postgres"
import { ConfigService } from "../config"
export declare class DatabaseService implements OnModuleInit {
  private config
  private pool
  db: ReturnType<typeof drizzle>
  constructor(config: ConfigService)
  onModuleInit(): void
  onModuleDestroy(): Promise<void>
}
