import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);
export const createId = () => {
  const id = nanoid();
  return `${id.slice(0, 3)}-${id.slice(3, 7)}-${id.slice(7, 10)}`;
};
