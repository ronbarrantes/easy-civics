"use server";
import { revalidatePath } from "next/cache";

import { eq, not } from "drizzle-orm";

import { db } from "@/server/db";
import { todo } from "@/server/db/schema";
import { tryCatch } from "@/utils/try-catch";

export const getTodos = async () => {
  const { data, error } = await tryCatch(db.select().from(todo));
  if (error) {
    console.error("Failed to fetch todos:", error);
    return [];
  }

  return data;
};

export const addTodo = async (text: string) => {
  const { data, error } = await tryCatch(db.insert(todo).values({ text }));

  if (error) return `Error: ${error.message}`;

  revalidatePath("/");
  return data;
};

export const deleteTodo = async (id: number) => {
  const { data, error } = await tryCatch(
    db.delete(todo).where(eq(todo.id, id))
  );

  if (error) return `Error: ${error.message}`;

  revalidatePath("/");
  return data;
};

export const toggleTodo = async (id: number) => {
  const { data, error } = await tryCatch(
    db
      .update(todo)
      .set({ done: not(todo.done) })
      .where(eq(todo.id, id))
  );

  if (error) return `Error: ${error.message}`;

  revalidatePath("/");
  return data;
};

export const editTodo = async (id: number, text: string) => {
  const { data, error } = await tryCatch(
    db.update(todo).set({ text }).where(eq(todo.id, id))
  );

  if (error) return `Error: ${error.message}`;

  revalidatePath("/");
  return data;
};
