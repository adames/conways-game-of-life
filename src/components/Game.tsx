import React, { useState, useEffect, HtmlHTMLAttributes } from "react";
import ButtonBar from "./ButtonBar";
import Grid from "./Grid";

const Game = () => {
  const gridRow = 20;
  const gridColumn = 20;

  const generateGrid = () => {
    let freshGrid: boolean[][] = [];
    for (let i = 0; i < gridRow; i++) {
      freshGrid.push([]);
      for (let j = 0; j < gridColumn; j++) {
        freshGrid[i].push(false);
      }
    }
    return freshGrid;
  };

  const [grid, setGrid] = useState(generateGrid);
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (isRunning) {
        updateGrid();
        setGeneration((lastGen) => lastGen + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const howManyNeighbors = (
    currentGrid: boolean[][],
    currentRow: number,
    currentColumn: number
  ) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        let newRow = currentRow + i;
        let newColumn = currentColumn + j;
        if (
          newRow >= 0 &&
          newRow < currentGrid.length &&
          newColumn >= 0 &&
          newColumn < currentGrid[0].length
        ) {
          count += currentGrid[newRow][newColumn] ? 1 : 0;
        }
      }
    }
    return count;
  };

  const doesCellSurvive = (cell: boolean, neighbors: number) => {
    if (cell && neighbors < 2) {
      return false;
    } else if (cell && (neighbors === 2 || neighbors === 3)) {
      return true;
    } else if (!cell && neighbors === 3) {
      return true;
    } else {
      return false;
    }
  };

  const updateGrid = () => {
    setGrid((currentGrid: boolean[][]) => {
      return currentGrid.map((rows, i) => {
        return rows.map((cell, j) => {
          let neighbors = howManyNeighbors(currentGrid, i, j);
          return doesCellSurvive(cell, neighbors);
        });
      });
    });
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleClear = () => {
    setGrid(generateGrid);
    setGeneration(0);
    setIsRunning(false);
  };

  const handleRandom = () => {
    let freshGrid: boolean[][] = [];
    for (let i = 0; i < gridRow; i++) {
      freshGrid.push([]);
      for (let j = 0; j < gridColumn; j++) {
        freshGrid[i].push(Math.random() < 0.6);
      }
    }
    setGrid(freshGrid);
  };

  const handleCellClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let selectedRow = parseInt(e.currentTarget.dataset.row || "0");
    let selectedColumn = parseInt(e.currentTarget.dataset.column || "0");
    setGrid((currentGrid) => {
      let newGrid: boolean[][] = currentGrid.map((row) => [...row]);
      newGrid[selectedRow][selectedColumn] =
        !newGrid[selectedRow][selectedColumn];
      return newGrid;
    });
  };

  return (
    <div className="game-container">
      <p>Current Generation: {generation}</p>
      <Grid grid={grid} handleCellClick={handleCellClick} />
      <ButtonBar
        isRunning={isRunning}
        handleClear={handleClear}
        handleRandom={handleRandom}
        handleStart={handleStart}
      />
    </div>
  );
};

export default Game;
