"use strict"
//# sourceMappingURL=index.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.baseEntitySchema = exports.paginationSchema = exports.idSchema = void 0
const zod_1 = require("zod")
exports.idSchema = zod_1.z.coerce.number().int().positive()
exports.paginationSchema = zod_1.z.object({
  limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
  offset: zod_1.z.coerce.number().int().min(0).default(0),
})
exports.baseEntitySchema = zod_1.z.object({
  id: exports.idSchema,
  createdAt: zod_1.z.date(),
  updatedAt: zod_1.z.date(),
})
