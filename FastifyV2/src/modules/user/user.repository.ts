import { eq } from 'drizzle-orm';
import { Database } from '../../db/index';
import { users, NewUser } from '../../db/schema/index';

export class UserRepository {
  constructor(private db: Database) {}

  async findAll(limit: number, offset: number) {
    return await this.db.select().from(users).limit(limit).offset(offset);
  }

  async findById(id: number) {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] || null;
  }

  async findByEmail(email: string) {
    const result = await this.db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] || null;
  }

  async create(data: NewUser) {
    const result = await this.db.insert(users).values(data).returning();
    return result[0];
  }

  async update(id: number, data: Partial<NewUser>) {
    const result = await this.db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0] || null;
  }

  async delete(id: number) {
    const result = await this.db.delete(users).where(eq(users.id, id)).returning();
    return result[0] || null;
  }
}
