import type { User, UserInput } from "./user.types";
import { userRepository } from "./user.repository";

export const userService = {
  async getAll(db: D1Database): Promise<User[]> {
    return userRepository.findAll(db);
  },

  async getById(db: D1Database, id: number): Promise<User | null> {
    return userRepository.findById(db, id);
  },

  async create(db: D1Database, data: UserInput): Promise<User> {
    // Add any business logic here (validation, transformation, etc.)
    return userRepository.create(db, data);
  },

  async delete(db: D1Database, id: number): Promise<boolean> {
    const user = await this.getById(db, id);
    if (!user) {
      throw new Error("User not found");
    }
    return userRepository.delete(db, id);
  },
};
