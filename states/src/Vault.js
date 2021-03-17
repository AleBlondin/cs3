import { useSelector } from "react-redux";
import { selectCount } from "./redux";
import "./Vault.css";

export const isCodeCorrect = (counts) => {
  if (counts.length === 0) {
    return false;
  }

  return counts.every((count) => count === counts[0]);
};

const Vault = () => {
  const getCountById = useSelector(selectCount);
  const counterIds = [1, 2, 3];
  const counts = counterIds.map((counterId) => getCountById({ counterId }));
  const isOpen = isCodeCorrect(counts);

  return (
    <div className="vault">{isOpen ? "Hey I'am open !" : "Still closed"}</div>
  );
};

export default Vault;
