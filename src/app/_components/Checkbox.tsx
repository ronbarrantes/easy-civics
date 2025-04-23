"use client";

import { useState } from "react";

export const TodoCheckbox = ({
  checked,
  checkToggleAction,
}: {
  checked: boolean;
  checkToggleAction: () => Promise<void>;
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    await checkToggleAction();
  };

  return <input type="checkbox" checked={isChecked} onChange={handleCheck} />;
};
