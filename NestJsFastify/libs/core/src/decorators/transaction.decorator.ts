export function Transaction() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const dbService = (this as any).databaseService;
      if (!dbService) {
        throw new Error("DatabaseService not found. Make sure to inject it.");
      }

      return await dbService.db.transaction(async (tx: typeof dbService.db) => {
        // Temporarily replace the db instance with the transaction
        const originalDb = dbService.db;
        dbService.db = tx;

        try {
          const result = await originalMethod.apply(this, args);
          return result;
        } finally {
          // Restore the original db instance
          dbService.db = originalDb;
        }
      });
    };

    return descriptor;
  };
}
