interface ButtonBar {
  handleClear: () => void;
  handleRandom: () => void;
  handleStart: () => void;
  isRunning: boolean;
}

const ButtonBar: React.FC<ButtonBar> = ({
  handleClear,
  handleRandom,
  handleStart,
  isRunning,
}) => {
  const handleButtonRandom = () => {
    handleRandom();
  };
  const handleButtonStart = () => {
    handleStart();
  };
  const handleButtonClear = () => {
    handleClear();
  };

  return (
    <div className="button-bar">
      <button onClick={handleButtonStart}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={handleButtonRandom}>Random</button>
      <button onClick={handleButtonClear}>Clear</button>
    </div>
  );
};
export default ButtonBar;
