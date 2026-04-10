import { __decorate } from "tslib";
import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { users, } from "../../../../infrastructure/database/src";
import { User } from "../domain/user.entity";
let UserRepository = class UserRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findAll(limit, offset) {
        const result = await this.databaseService.db
            .select()
            .from(users)
            .limit(limit)
            .offset(offset);
        return result.map(User.fromDb);
    }
    async findById(id) {
        const result = await this.databaseService.db
            .select()
            .from(users)
            .where(eq(users.id, id))
            .limit(1);
        return result.length > 0 ? User.fromDb(result[0]) : null;
    }
    async findByEmail(email) {
        const result = await this.databaseService.db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
        return result.length > 0 ? User.fromDb(result[0]) : null;
    }
    async create(userData) {
        const result = await this.databaseService.db
            .insert(users)
            .values(userData)
            .returning();
        return User.fromDb(result[0]);
    }
    async update(id, userData) {
        const result = await this.databaseService.db
            .update(users)
            .set(userData)
            .where(eq(users.id, id))
            .returning();
        return result.length > 0 ? User.fromDb(result[0]) : null;
    }
    async delete(id) {
        const result = await this.databaseService.db
            .delete(users)
            .where(eq(users.id, id))
            .returning({ id: users.id });
        return result.length > 0;
    }
};
UserRepository = __decorate([
    Injectable()
], UserRepository);
export { UserRepository };
//# sourceMappingURL=user.repository.js.map