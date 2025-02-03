"use client";

import { useEffect, useState, useRef } from 'react';
import PathfinderGrid from '@/components/PathfinderGrid';
import { GridProvider, useGridContext } from '@/context/GridContext';
import { Button } from '@/components/ui/button';
import { bfs, dfs, a_star, a_star_manhattan, random_walk } from '../utils/pathfinding-algorithms';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
 } from '@/components/ui/dialog';

const delay = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export default function PathfindingPage() {


  const {initializeGrid, setCellWall, gridVals, ends, startPlaced, selectorMode, setModeToWall, setModeToStart, setModeToEnd, setModeToBlank, setCellViewed, setCellPath, setCellBlank, algorithm, setAlgorithm} = useGridContext();
  const [algoRunning, setAlgoRunning] = useState(0); // 0 = not running, clear ; 1 = running ; 2 = not running ran, not clear
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  // const [preempter, setPreempter] = useState(false); // on true -- algorithm stops
  const preempter = useRef({shouldStop : false});



  useEffect(() => {
    initializeGrid(48, 32);
  }, []);

  const algorithms = {
    'bfs' : bfs,
    'dfs' : dfs,
    'astar' : a_star,
    'astar-manhattan' : a_star_manhattan,
    'randomWalk': random_walk,
  }

  

  const handleValChange = (val) => {
    if(val==='astar') {
      setDialogIsOpen(true);
    } 
    setAlgorithm(val)
  }

  function clearViewedAndPath() {
    for (const row of gridVals) {
      for (const cell of row) {
        if (cell.type === 1 || cell.type === 2) {
          setCellBlank(cell.x, cell.y);
        }
      }
    }
  }

  function clearViewedWallsAndPath() {
    for (const row of gridVals) {
      for (const cell of row) {
        if (cell.type === 1 || cell.type === 2 || cell.type === 3) {
          setCellBlank(cell.x, cell.y);
        }
      }
    }
  }

  function setMaze() {
    if (algoRunning === 1) {
      return; // do nothing when algorithm is running
    }

    clearViewedWallsAndPath();

    for(const row of gridVals) {
      for(const cell of row) {
        const chance = Math.random() * (3); 
        if(chance > 2 && cell.type !== 4 && cell.type !== 5) { // avoid overwriting start and ends
          setCellWall(cell.x, cell.y);
        }
      }
    }

    setAlgoRunning(0); // this accomplishes a reset!
  }

  const handleRunClick = async () => {
    if (algoRunning === 2) {
      // then this button is in 'reset path' mode
      clearViewedAndPath();
      setAlgoRunning(0);
      return;
    }

    if (!startPlaced || !algorithm) {
      return;
    }

    if (algoRunning === 1) {
      // if the algorithm is literally currently running, run should do nothing, we have a stop button for this reason
      return;
    }

    // Initialize preempter
    // preempter.current.shouldStop = true;

    // await delay(500); // delay for 500 to make sure it rly stops

    preempter.current.shouldStop = false;

    // Clear previous paths and viewed cells
    clearViewedAndPath();

    setAlgoRunning(1);

    // Start the algorithm
    algorithms[algorithm](gridVals, startPlaced.x, startPlaced.y, setCellViewed, setCellPath, ends, preempter.current).then(async (path) => {
      if (preempter.shouldStop || !path) {
        setAlgoRunning(2); // algo no longer running, but not reset
        return;
      }
      
      console.log(path);
      for (const coord of path) {
        await setCellPath(coord.x, coord.y);
      }
      setAlgoRunning(2); // algorithm has run, requires resetting
    });
  }
  
  const runButtonText = ["Run", "running...", "Reset Path"];


  return (
    <div className="full-pathfinding-page w-screen h-screen p-4 flex flex-row justify-center gap-5 items-center">
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>A☆ Search Algorithm </DialogTitle>
          </DialogHeader>
          <p>The A☆ search algorithm has the capacity to move diagonally, not just up, down, left, right. Reflect this in your wall placement, as it will sneak through corners you don't expect.<br/><br/>If you want to see A☆ in action without diagonals, select <span className='font-bold'>A☆ (No Diagonal)</span> instead.</p>
        </DialogContent>
      </Dialog>

      <div className="pathfinding-graph-section overflow-auto w-[70%] h-full flex flex-col p-2 justify-center items-center border border-gray-300 rounded-lg shadow-inner">
        <PathfinderGrid/>
        
      </div>

      <div className="pathfinding-control-panel w-[27%] h-full border border-gray-300 rounded-lg shadow-inner py-8 px-4">
        <div className="control-panel-title flex flex-row items-center w-full h-[10%]">
          <h1>Controls</h1>
          {
            // only if algorithm actively running
            (algoRunning === 1) && 
            <Button
              className='rounded-full scale-[0.8] h-[44px] w-[44px] ml-56 mb-2'
              variant="destructive"
              onClick={() => {preempter.current.shouldStop = true; setAlgoRunning(2);}} // preemption happens mid-run, algo must be reset
            >
              <div className='bg-white w-[12px] h-[12px]' />
            </Button>
          }
        </div>
        <div className='control-panel-body flex flex-col w-full'>
            <Select onValueChange={(val) => {handleValChange(val)}}>
              <SelectTrigger className='my-5'>
                <SelectValue placeholder='Select an algorithm...' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Algorithms</SelectLabel>
                  <SelectItem value='bfs'>Breadth First Search</SelectItem>
                  <SelectItem value='dfs'>Depth First Search</SelectItem>
                  <SelectItem value='astar'>A☆</SelectItem>
                  <SelectItem value='astar-manhattan'>A☆ (No Diagonal)</SelectItem>
                  <SelectItem value='randomWalk'>Random Walk (no revisit)</SelectItem>

                </SelectGroup>
              </SelectContent>
            </Select>
          <div className='mt-5 flex flex-row gap-4 w-2/3'>
            
            <Button
              className='w-full'
              variant="secondary"
              onClick={setModeToStart}
            >
              Set Start
            </Button>
            <Button
              className='w-full'
              variant="secondary"
              onClick={setModeToEnd}
            >
              Set End
            </Button>
          </div>

          <div className='flex flex-col gap-1'>
            <Button
              className='mt-5 w-2/3'
              variant='secondary'
              onClick={setModeToWall}
            >
              Wall Mode
            </Button>
            <Button
              className='mt-1 w-2/3'
              variant='secondary'
              onClick={setModeToBlank}
            >
              Eraser Mode
            </Button>

            <Button
              className='mt-24 w-full'
              variant='outline'
              onClick={() => {initializeGrid(48, 32); setAlgoRunning(0);}}
            >
              Clear
            </Button>

            <Button
              className={`mt-5 w-full bg-gray-900 text-white ${!algoRunning && 'hover:bg-gray-600'}`}
              variant={algoRunning ? 'loading' : 'secondary'}
              onClick={handleRunClick}
            >
              {runButtonText[algoRunning]}
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
