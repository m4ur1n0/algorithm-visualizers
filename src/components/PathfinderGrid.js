import React, { useState, useEffect } from 'react'
import GraphCell from './GraphCell'
import { useGridContext } from '@/context/GridContext';

const PathfinderGrid = () => {
    
    const {gridVals, updateCellType, setCellWall} = useGridContext();
    const {selectorMode} = useGridContext();
    const [preempter, setPreempter] = useState(false); // on true -- algorithm stops




  return (
    <div className=' grid grid-cols-[repeat(48,_1.4vw)] grid-rows-[repeat(32,_2.9vh)] '
    >
        {
            gridVals.map((row, idx) => (
                <React.Fragment key={idx}>
                    {
                        row.map((cell, cellIdx) => (
                            <div 
                                className='col-span-1 row-span-1' 
                                key={cellIdx} 
                                onClick={() => selectorMode.func(cell.x, cell.y)} 
                            >
                                <GraphCell cellData={cell}/>
                            </div>
                        ))
                    }
                </React.Fragment>
            ))
        }

    </div>
  )
}

export default PathfinderGrid
