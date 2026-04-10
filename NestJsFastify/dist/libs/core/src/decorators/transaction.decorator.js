export function Transaction() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const dbService = this.databaseService;
            if (!dbService) {
                throw new Error("DatabaseService not found. Make sure to inject it.");
            }
            return await dbService.db.transaction(async (tx) => {
                // Temporarily replace the db instance with the transaction
                const originalDb = dbService.db;
                dbService.db = tx;
                try {
                    const result = await originalMethod.apply(this, args);
                    return result;
                }
                finally {
                    // Restore the original db instance
                    dbService.db = originalDb;
                }
            });
        };
        return descriptor;
    };
}
//# sourceMappingURL=transaction.decorator.js.map