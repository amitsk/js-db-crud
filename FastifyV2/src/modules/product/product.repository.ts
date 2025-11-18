import { eq } from 'drizzle-orm';
import { Database } from '../../db/index';
import { products, NewProduct } from '../../db/schema/index';

export class ProductRepository {
  constructor(private db: Database) {}

  async findAll(limit: number, offset: number) {
    return await this.db.select().from(products).limit(limit).offset(offset);
  }

  async findById(id: number) {
    const result = await this.db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0] || null;
  }

  async create(data: NewProduct) {
    const result = await this.db.insert(products).values(data).returning();
    return result[0];
  }

  async update(id: number, data: Partial<NewProduct>) {
    const result = await this.db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return result[0] || null;
  }

  async delete(id: number) {
    const result = await this.db.delete(products).where(eq(products.id, id)).returning();
    return result[0] || null;
  }
}
