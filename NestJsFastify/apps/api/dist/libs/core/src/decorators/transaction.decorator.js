"use strict"
//# sourceMappingURL=transaction.decorator.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.Transaction = Transaction
function Transaction() {
  return function (target, propertyKey, descriptor) {
    const originalMethod = descriptor.value
    descriptor.value = async function (...args) {
      const dbService = this.databaseService
      if (!dbService) {
        throw new Error("DatabaseService not found. Make sure to inject it.")
      }
      return await dbService.db.transaction(async (tx) => {
        const originalDb = dbService.db
        dbService.db = tx
        try {
          const result = await originalMethod.apply(this, args)
          return result
        } finally {
          dbService.db = originalDb
        }
      })
    }
    return descriptor
  }
}
