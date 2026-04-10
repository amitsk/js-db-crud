import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
dotenv.config();
async function bootstrap() {
    const app = await NestFactory.create(AppModule, new FastifyAdapter());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map