"use client";
import { api } from "@/trpc/react";

export const MyButton = ({
  id,
  children,
}: {
  id: number;
  children: React.ReactNode;
}) => {
  // Use the mutation hook at the top level of the component
  const { isPending: isLoading, mutateAsync } = api.todos.delete.useMutation();

  const handleClick = async () => {
    try {
      // Call the mutation and wait for it to complete
      await mutateAsync({ id });
      console.log(`Todo with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Deleting..." : children}
    </button>
  );
};
