import type { User, Vehicle } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Vehicle } from "@prisma/client";

export function getVehicle({
  id,
  userId,
}: Pick<Vehicle, "id"> & {
  userId: User["id"];
}) {
  return prisma.vehicle.findFirst({
    select: { id: true, year: true, make: true, model: true },
    where: { id, userId },
  });
}

export function getVehicleListItems({ userId }: { userId: User["id"] }) {
  return prisma.vehicle.findMany({
    where: { userId },
    select: {
      id: true,
      year: true,
      make: true,
      model: true,
      vin: true,
      includedOnPolicy: true,
    },
    orderBy: { year: "desc" },
  });
}

export function createVehicle({
  year,
  make,
  model,
  vin,
  userId,
  includedOnPolicy,
}: Pick<Vehicle, "year" | "make" | "model" | "vin" | "includedOnPolicy"> & {
  userId: User["id"];
}) {
  return prisma.vehicle.create({
    data: {
      year,
      make,
      model,
      vin,
      includedOnPolicy,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export async function updateVehicle<T extends keyof Vehicle>(
  id: Vehicle["id"],
  column: T,
  value: Vehicle[T],
) {
  const data: Partial<Vehicle> = {};
  data[column] = value;

  return prisma.vehicle.update({
    where: { id },
    data,
  });
}

export function deleteVehicle({
  id,
  userId,
}: Pick<Vehicle, "id"> & { userId: User["id"] }) {
  return prisma.vehicle.deleteMany({
    where: { id, userId },
  });
}
