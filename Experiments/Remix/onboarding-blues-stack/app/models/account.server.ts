import type { Password, Account } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { Account } from "@prisma/client";

export async function createAccount() {
  return prisma.account.create({
    data: {},
  });
}
