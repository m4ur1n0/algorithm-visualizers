"use client";

import { useEffect, useState, useRef } from 'react';
import PathfinderGrid from '@/components/PathfinderGrid';
import { GridProvider, useGridContext } from '@/context/GridContext';
import { Button } from '@/components/ui/button';
import { bfs, dfs, a_star, random_walk } from '../utils/pathfinding-algorithms';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const delay = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export default function PathfindingPage() {


  const {initializeGrid, setCellWall, gridVals, ends, startPlaced, selectorMode, setModeToWall, setModeToStart, setModeToEnd, setModeToBlank, setCellViewed, setCellPath, setCellBlank, algorithm, setAlgorithm} = useGridContext();
  const [algoRunning, setAlgoRunning] = useState(false);
  // const [preempter, setPreempter] = useState(false); // on true -- algorithm stops
  const preempter = useRef({shouldStop : false});



  useEffect(() => {
    initializeGrid(48, 32);
  }, []);

  const algorithms = {
    'bfs' : bfs,
    'dfs' : dfs,
    'astar' : a_star,
    'randomWalk': random_walk,
  }

  const fix = async () => {
    await delay(1000);
    setPreempter(false);
  }

  const preempt = async () => {
    setPreempter(true);
    // fix();
  }

  function setMaze() {
    initializeGrid(48, 32);

    for(const row of gridVals) {
      for(const cell of row) {
        const chance = Math.random() * (3); 
        if(chance > 2) {
          setCellWall(cell.x, cell.y);
        }
      }
    }
  }
  


  return (
    <div className="full-pathfinding-page w-screen h-screen p-4 flex flex-row justify-center gap-5 items-center">

      <div className="pathfinding-graph-section overflow-auto w-[70%] h-full flex flex-col p-2 justify-center items-center border border-gray-300 rounded-lg shadow-inner">
        <PathfinderGrid/>
        
      </div>

      <div className="pathfinding-control-panel w-[27%] h-full border border-gray-300 rounded-lg shadow-inner py-8 px-4">
        <div className="control-panel-title flex flex-row items-center w-full h-[10%]">
          <h1>Controls</h1>
          {
            true &&
            <Button
              className='rounded-full scale-[0.8] ml-56'
              variant="destructive"
              onClick={() => {preempter.current.shouldStop = true; setAlgoRunning(false);}}
            >
              <div className='bg-white w-[12px] h-[12px]' />
            </Button>
          }
        </div>
        <div className='control-panel-body flex flex-col w-full'>
            <Select onValueChange={(val) => {if(val==='astar'){alert("NOTE: A* wants to move DIAGONALLY -- reflect this with your wall palcement.")} setAlgorithm(val)}}>
              <SelectTrigger className='my-5'>
                <SelectValue placeholder='Select an algorithm...' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Algorithms</SelectLabel>
                  <SelectItem value='bfs'>Breadth First Search</SelectItem>
                  <SelectItem value='dfs'>Depth First Search</SelectItem>
                  <SelectItem value='astar'>A☆</SelectItem>
                  <SelectItem value='randomWalk'>Random Walk (no revisit)</SelectItem>

                </SelectGroup>
              </SelectContent>
            </Select>
          <div className='mt-5 flex flex-row gap-4 w-full'>
            
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
              className={`mt-5 w-full bg-gray-900 text-white ${!algoRunning && 'hover:bg-gray-600'}`}
              variant={algoRunning ? 'loading' : 'secondary'}
              onClick={async () => {
                if (!startPlaced || !algorithm) {
                  return;
                }

                // Initialize preempter
                preempter.current.shouldStop = false;

                // Clear previous paths and viewed cells
                for (const row of gridVals) {
                  for (const cell of row) {
                    if (cell.type === 1 || cell.type === 2) {
                      setCellBlank(cell.x, cell.y);
                    }
                  }
                }

                setAlgoRunning(true);

                // Start the algorithm
                algorithms[algorithm](gridVals, startPlaced.x, startPlaced.y, setCellViewed, setCellPath, ends, preempter.current).then(async (path) => {
                  if (preempter.shouldStop || !path) {
                    setAlgoRunning(false); // Ensure the state is reset
                    return;
                  }
                  
                  console.log(path);
                  for (const coord of path) {
                    await setCellPath(coord.x, coord.y);
                  }
                  setAlgoRunning(false);
                });
              }}
            >
              {algoRunning ? "running..." : "RUN"}
            </Button>



            <Button
              className='mt-5 w-full'
              variant='secondary'
              onClick={setMaze}
            >
              Generate Walls
            </Button>

            
            
          </div>


        </div>

      </div>

    </div>

  );
}
