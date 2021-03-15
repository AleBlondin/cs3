import "./Vault.css";
import { useState } from "react";

export const isCodeCorrect = (counts) => {
  if (counts.length === 0) {
    return false;
  }

  return counts.every((count) => count === counts[0]);
};

const Vault = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="vault">{isOpen ? "Hey I'am open !" : "Still closed"}</div>
  );
};

export default Vault;
