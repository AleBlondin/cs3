import "./Vault.css";

export const isCodeCorrect = (counts) => {
  if (counts.length === 0) {
    return false;
  }

  return counts.every((count) => count === counts[0]);
};

const Vault = ({ counts }) => {
  const isOpen = isCodeCorrect(counts);
  // const isOpen = useMemo(() => isCodeCorrect(counts), counts);

  return (
    <div className="vault">{isOpen ? "Hey I'am open !" : "Still closed"}</div>
  );
};

export default Vault;
