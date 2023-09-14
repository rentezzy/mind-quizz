import { useState } from "react";
export const useCodeField = () => {
  const [code, setCode] = useState("");

  const codeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      (value.length === 3 || value.length === 8) &&
      value[value.length - 1] !== "-" &&
      value.length > code.length
    ) {
      setCode(value + "-");
      return;
    }
    setCode(value);
  };
  return { code, setCode: codeChangeHandler };
};
