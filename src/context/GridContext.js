// context/GridContext.js
import React, { createContext, useContext, useState, useCallback } from "react";

const GridContext = createContext();

export const GridProvider = ({ children }) => {
  const [gridVals, setGridVals] = useState([]);
  const [startPlaced, setStartPlaced] = useState(null);
  // const dflt = (x, y) => {console.log("")};

  // Initialize the grid
  const initializeGrid = (rows, cols) => {
    setStartPlaced(null);
    const initialGrid = Array.from({ length: rows }, (_, y) =>

      Array.from({ length: cols }, (_, x) => ({
        type: 0, // default cell type
        x,
        y,
      }))
    );
    setGridVals(initialGrid);
  };

  // Update a specific cell
  const updateCellType = useCallback((x, y, newType) => {
    setGridVals(prevGrid => {
      const updatedGrid = prevGrid.map((row, rowIndex) =>
        rowIndex === y
          ? row.map((cell, colIndex) =>
              colIndex === x ? { ...cell, type: newType } : cell
            )
          : row
      );
  
      // Log the updated cell using the new grid
      // console.log(`cell update: x ${x}, y ${y}, type: ${updatedGrid[y][x].type}`);
      return updatedGrid;
    });
  }, []);

  // type has one of the following values : 
    //      blank -- empty, nothing (yet) -- 0
    //      viewed -- set as a pathfinding algorithm actually views the cell -- 1
    //      path -- a part that has been selected as a given path -- 2
    //      wall -- a barrier in a pathfinding property -- 3
    //      start -- the starting cell -- 4
    //      end -- the goal cell -- 5

  
  const setCellBlank = (x, y) => {
    if (x&&y) {  
      updateCellType(x, y, 0);
    }
  }

  const setCellViewed = (x, y) => {
    if (x&&y) {  
      updateCellType(x, y, 1);
    }
  }

  const setCellPath = (x, y) => {
    if (x&&y) {  
      updateCellType(x, y, 2);
    }
  }

  const setCellWall = (x, y) => {
    if (x&&y) {  
      updateCellType(x, y, 3);
    }
  }

  const setCellStart = (x, y) => {
    if (x&&y&&!startPlaced) {  
      updateCellType(x, y, 4);
      setStartPlaced({x, y});
      setModeToWall();
    }
  }

  const setCellEnd = (x, y) => {
    if (x&&y) {  
      updateCellType(x, y, 5);
    }
  }

  const [selectorMode, setSelectorMode] = useState({func : setCellWall});


  const setModeToBlank = () => setSelectorMode({func : setCellBlank});
  const setModeToWall = () => setSelectorMode({func : setCellWall});
  const setModeToStart = () => setSelectorMode({func : setCellStart});
  const setModeToEnd = () => setSelectorMode({func : setCellEnd});

  // Context value
  const value = {
    gridVals,
    initializeGrid,
    updateCellType,
    setCellBlank,
    setCellViewed,
    setCellPath,
    setCellWall,
    setCellStart,
    setCellEnd,
    selectorMode,
    setModeToBlank,
    setModeToWall,
    setModeToStart,
    setModeToEnd,
    setStartPlaced,
    startPlaced,

  };

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
};

// Custom hook to access the context
export const useGridContext = () => useContext(GridContext);
