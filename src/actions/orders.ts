"use server";

import * as ordersService from "@/services/orders";

export async function update(id: number, status: string, userId: string) {
  return ordersService.update(id, status, userId);
}
