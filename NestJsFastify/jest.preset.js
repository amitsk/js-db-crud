const { pathsToModuleNameMapper } = require("ts-jest")

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapping: pathsToModuleNameMapper({
    "@nestjs-fastify-monolith/api": ["apps/api/src/index.ts"],
    "@nestjs-fastify-monolith/core": ["libs/core/src/index.ts"],
    "@nestjs-fastify-monolith/shared": ["libs/shared/src/index.ts"],
    "@nestjs-fastify-monolith/domain/user": ["libs/domain/user/src/index.ts"],
    "@nestjs-fastify-monolith/domain/product": [
      "libs/domain/product/src/index.ts",
    ],
    "@nestjs-fastify-monolith/domain/order": ["libs/domain/order/src/index.ts"],
    "@nestjs-fastify-monolith/infrastructure/database": [
      "libs/infrastructure/database/src/index.ts",
    ],
  }),
}
