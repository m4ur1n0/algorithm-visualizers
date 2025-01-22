// context/GridContext.js
import { ChartNoAxesColumnDecreasingIcon } from "lucide-react";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const GridContext = createContext();

const delay = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const GridProvider = ({ children }) => {
  const [gridVals, setGridVals] = useState([]);
  const [startPlaced, setStartPlaced] = useState({x : -1, y : -1});
  const [ends, setEnds] = useState([]);

  const appendEnd = (newEnd) => {
    setEnds([...ends, newEnd]);
  }

  const removeEnd = (end) => {
    ends.forEach((existingEnd, idx) => {
      if (existingEnd.x === end.x && existingEnd.y === end.y) {
        setEnds([...(ends.splice(idx, 1))]);
        return;
      }
    })
  }
  // const dflt = (x, y) => {console.log("")};

  // Initialize the grid
  const initializeGrid = (cols, rows) => {
    setStartPlaced({x : -1, y: -1});
    setEnds([]);
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
    
    if(startPlaced.x === x && startPlaced.y === y) {
      setStartPlaced({x: -1, y: -1});
      console.log("setBlank thinks it is erasing start");
    }



    updateCellType(x, y, 0);
    removeEnd({x,y});

  }

  const setCellViewed = async (x, y) => {
    if (gridVals[y][x].type!==4&&gridVals[y][x].type!==5) {
      await delay(50); 
      updateCellType(x, y, 1);
    }
    return;
  }

  const setCellPath = async (x, y) => {
    
    if (gridVals[y][x].type!==4&&gridVals[y][x].type!==5) {  
      await delay(50); 
      updateCellType(x, y, 2);

    }
    return;
    
  }

  const setCellWall = (x, y) => {
    
    if(startPlaced.x === x && startPlaced.y === y) {
      setStartPlaced({x: -1, y: -1});
    }
    

    updateCellType(x, y, 3);
    removeEnd({x, y});

    
  }

  const setCellStart = (x, y) => {

    setStartPlaced((prevStartPlaced) => {
      if(prevStartPlaced.x !== -1) {
        setCellBlank(startPlaced.x, startPlaced.y);
        console.log("cleared start from",startPlaced.x, startPlaced.y);

      }

      updateCellType(x, y, 4);
      const newStartPlacement = {x : x, y : y};
      // console.log(`placed start : ${JSON.stringify(startPlaced)}, ${JSON.stringify(newStartPlacement)}`);
      removeEnd({x, y});

      return newStartPlacement;
    })


    // if(startPlaced.x === -1) {
    //   setStartPlaced({x, y});
    //   updateCellType(x, y, 4);
    // }
    setSelectorMode({func : setCellWall});
  }

  const setCellEnd = (x, y) => {
    if (gridVals[y][x].type!==4) { // can't set end as start :/
      appendEnd({x, y});
      updateCellType(x, y, 5);
    }
    
  }

  const [selectorMode, setSelectorMode] = useState({func : setCellWall});


  const setModeToBlank = () => setSelectorMode({func : setCellBlank});
  const setModeToWall = () => setSelectorMode({func : setCellWall});
  const setModeToStart = () => setSelectorMode({func : setCellStart});
  const setModeToEnd = () => setSelectorMode({func : setCellEnd});


  // mouseup mousedown
  // const [isMouseDown, setMouseDown] = useState(false);
  // const handleMouseDown = (e) => {
  //   e.preventDefault(); // Prevent default browser behavior
  //   e.stopPropagation(); // Prevent the event from bubbling up
  //   console.log('x');
  //   setMouseDown(true);
  // }

  // const handleMouseUp = (e) => {
  //   e.preventDefault(); // Prevent default browser behavior
  //   e.stopPropagation(); // Prevent the event from bubbling up
  //   console.log('y');
  //   setMouseDown(false);
  // }

  // useEffect(() => {

  //   window.addEventListener('mouseup', handleMouseUp);
  //   window.addEventListener('mousedown', handleMouseDown);

  //   return () => {
  //       window.removeEventListener('mouseup', handleMouseUp);
  //       window.removeEventListener('mousedown', handleMouseDown);
  //   }
  // }, [isMouseDown])

  //pathfinding mode
  const [algorithm, setAlgorithm] = useState(null);




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
    algorithm,
    setAlgorithm,
    ends,

  };

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
};

// Custom hook to access the context
export const useGridContext = () => useContext(GridContext);
