import { sha256 } from "js-sha256";

export const handleHash = (password) => {
  if (!password) return;
  return sha256(password);
};
