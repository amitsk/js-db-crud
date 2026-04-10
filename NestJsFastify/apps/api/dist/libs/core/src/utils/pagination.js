"use strict"
//# sourceMappingURL=pagination.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.getPaginationOptions = getPaginationOptions
function getPaginationOptions(query) {
  const limit = Math.min(
    parseInt(query.limit) ||
      10,
    100,
  )
  const offset =
    parseInt(query.offset) ||
    0
  return { limit, offset }
}
