import { useGridContext } from '@/context/GridContext';
import React, { useEffect } from 'react';

const GraphCell = React.memo(({cellData}) => {
  // type has one of the following values : 
    //      blank -- empty, nothing (yet) -- 0
    //      viewed -- set as a pathfinding algorithm actually views the cell -- 1
    //      path -- a part that has been selected as a given path -- 2
    //      wall -- a barrier in a pathfinding property -- 3
    //      start -- the starting cell -- 4
    //      end -- the goal cell -- 5

    
    const colors = {
      0: "#ffffff", // white
      1: "#e5e7eb", // gray-200
      2: "#93c5fd", // blue-300
      3: "#111827", // gray-900
      4: "#34d399", // green-400
      5: "#f87171", // red-400
    };
    
    const cellStyle = {
      width: "100%",
      height: "100%",
      background: colors[cellData.type],
    };

  // useEffect(() => {
  //   console.log(`cell type : x : ${cellData.x} y : ${cellData.y} type : ${cellData.type}`);
  // });

  return (
    <div className={`graph-cell border border-grey-900`} style={cellStyle}>
      {/* Example: Displaying x and y coordinates */}
      {/* {`${x},${y}`} */}
      
    </div>
  );
});

export default GraphCell;
