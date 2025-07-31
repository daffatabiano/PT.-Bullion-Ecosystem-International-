import { sha256 } from "js-sha256";

export const handleHash = (password) => {
      const hashedPassword = sha256(password);
      return hashedPassword;
};