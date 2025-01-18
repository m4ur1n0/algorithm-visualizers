"use client";

import { useEffect } from 'react';
import PathfinderGrid from '@/components/PathfinderGrid';
import { GridProvider, useGridContext } from '@/context/GridContext';
import { Button } from '@/components/ui/button';
import { bfs } from '../utils/bfs';



export default function PathfindingPage() {


  const {initializeGrid, gridVals, startPlaced, selectorMode, setModeToWall, setModeToStart, setModeToEnd, setModeToBlank, setCellViewed} = useGridContext();


  useEffect(() => {
    initializeGrid(48, 32);
  }, []);

  


  return (
    <div className="full-pathfinding-page w-screen h-screen p-4 flex flex-row justify-center gap-5 items-center">

      <div className="pathfinding-graph-section overflow-auto w-[70%] h-full flex flex-col p-2 justify-center items-center border border-gray-300 rounded-lg shadow-inner">
        <PathfinderGrid/>
        
      </div>

      <div className="pathfinding-control-panel w-[27%] h-full border border-gray-300 rounded-lg shadow-inner py-8 px-4">
        <div className="control-panel-title">
          <h1>Controls</h1>
          <div className='mt-5 flex flex-row gap-4'>
            <Button
              className=''
              variant="secondary"
              onClick={setModeToStart}
            >
              Set Start
            </Button>
            <Button
              className=''
              variant="secondary"
              onClick={setModeToEnd}
            >
              Set End
            </Button>
          </div>

          <div className='flex flex-col'>
            <Button
              className='mt-5 w-1/3'
              variant='secondary'
              onClick={setModeToWall}
            >
              Wall
            </Button>
            <Button
              className='mt-1 w-1/3'
              variant='secondary'
              onClick={setModeToBlank}
            >
              Eraser
            </Button>

            <Button
              className='mt-24 w-full'
              variant='outline'
              onClick={() => initializeGrid(48, 32)}
            >
              Clear
            </Button>

            <Button
              className='mt-24 w-full'
              variant='secondary'
              onClick={() => {
                if(!startPlaced) {
                  return;
                }
                console.log(bfs(gridVals, startPlaced.x, startPlaced.y, setCellViewed));
              }}
            >
              BFS
            </Button>
          </div>


        </div>

      </div>

    </div>

  );
}
