interface Grid {
  handleCellClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  grid: boolean[][];
}

const Grid: React.FC<Grid> = ({ grid, handleCellClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleCellClick(e);
  };

  return (
    <div
      className="grid-container"
      style={{
        gridTemplateColumns: `repeat(${grid.length}, 20px)`,
      }}
    >
      {grid.map((row: boolean[], rowIndex: number) =>
        row.map((cell, columnIndex) => (
          <button
            onClick={handleClick}
            data-row={rowIndex}
            data-column={columnIndex}
            className="cell"
            style={{
              backgroundColor: cell ? "black" : "white",
            }}
            key={`${rowIndex}-${columnIndex}`}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
