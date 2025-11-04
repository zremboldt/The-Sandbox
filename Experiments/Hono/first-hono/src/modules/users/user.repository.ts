import type { User, UserInput } from "./user.types";

export const userRepository = {
  async findAll(db: D1Database): Promise<User[]> {
    const { results } = await db.prepare("SELECT * FROM users").all();
    return results as User[];
  },

  async findById(db: D1Database, id: number): Promise<User | null> {
    const result = await db
      .prepare("SELECT * FROM users WHERE id = ?")
      .bind(id)
      .first();
    return result as User | null;
  },

  async create(db: D1Database, data: UserInput): Promise<User> {
    const result = await db
      .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
      .bind(data.name, data.email)
      .run();

    if (!result.success) {
      throw new Error("Failed to create user");
    }

    // Return the created user
    const newUser = await this.findById(db, result.meta.last_row_id as number);
    if (!newUser) {
      throw new Error("Failed to retrieve created user");
    }

    return newUser;
  },

  async delete(db: D1Database, id: number): Promise<boolean> {
    const result = await db
      .prepare("DELETE FROM users WHERE id = ?")
      .bind(id)
      .run();

    return result.success && result.meta.changes > 0;
  },
};
