"use client";

import { Suspense } from "react";

import { api } from "@/trpc/react";

const TodoList = () => {
  const { data: todos } = api.todos.getAll.useQuery(undefined, {
    suspense: true,
  });

  return (
    <div>
      {todos?.map((item) => (
        <div className="flex gap-2" key={`${item.text}-${item.id}`}>
          <span>
            {item.text} {item.id}
          </span>
        </div>
      ))}
    </div>
  );
};

export const List = () => {
  return (
    <Suspense fallback={<div>Loading todos...</div>}>
      <TodoList />
    </Suspense>
  );
};
