"use client";
import { useState } from "react";

export const TodoInput = ({
  addTodoAction,
}: {
  addTodoAction: (todo: string) => Promise<void>;
}) => {
  const [todo, setTodo] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const action = await addTodoAction(todo);
    console.log("action", action);
    setTodo("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={todo}
          placeholder="Todo..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
