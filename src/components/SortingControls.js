import { useSortingContext } from '@/context/SortingContext';
import { Button } from './ui/button';
import React, { useRef, useState } from 'react'

import { randomize, selectionSort, bubbleSort } from '@/app/utils/sorting-algorithms';
import { Slider } from './ui/slider';
import SortingDropdown from './SortingDropdown';
import { toast } from 'sonner';

function SortingControls() {

    const { positions, swapPositions, barValues, algoState, setAlgoUnsorted, setAlgoSorted, setAlgoRunning, setNum} = useSortingContext();
    const [selectedAlgo, setSelectedAlgo] = useState('none');
    const preempter = useRef({ shouldStop: false });


    const algorithmMenu = {
        "none" : NoAlgSelected,
        "selection" : () => selectionSort(positions, swapPositions, preempter.current),
        "bubble" : () => bubbleSort(positions, swapPositions, preempter.current),
    }


    function stopAlgorithm() { 
        preempter.current.shouldStop = true; 
        setAlgoUnsorted(); // preemption happens mid-run, algo must be reset
    }

    function NoAlgSelected() {
       toast.error("No algorithm selected.")
    }

    function handleSliderValueChange(value) {

        setNum(value);

    }

    function handleRunScramble() {

        randomize(positions, swapPositions);
        setAlgoUnsorted();
    }

    async function handleRunSort() {
        

        if (selectedAlgo !== "none") {
            preempter.current.shouldStop = false;
            setAlgoRunning();
            const algo = algorithmMenu[selectedAlgo];
            await algo();
            if (!preempter.current.shouldStop) {
                setAlgoSorted();
            }
        } else {
            NoAlgSelected();
        }
    }


    return (
        <div className='w-[26%] h-full rounded-lg border border-gray-300 px-4 py-8'>
            {/* SORTING STOP AND TITLE */}
            <div className="control-panel-title flex flex-row items-center w-full h-[10%]">
                <h1>Controls</h1>
                {/* {
                    // only if algorithm actively running
                    (algoState === 2) &&
                    <Button
                        className='rounded-full scale-[0.8] h-[44px] w-[44px] ml-56 mb-2'
                        variant="destructive"
                        onClick={stopAlgorithm} 
                    >
                        <div className='bg-white w-[12px] h-[12px]' />
                    </Button>} */}
            </div>
            
            {/* SELECT ALGORITHM DROPDOWN */}
            <div className='actual-controls w-full flex flex-col justify-start items-center'>

                <SortingDropdown setSelectedAlgo={setSelectedAlgo} />
                
                <div className='w-[98%] flex flex-col'>
                    <label htmlFor='bars-slider' className='w-full text-start mb-3 text-sm font-semibold'>Number of Elements</label>
                    <Slider 
                        className="w-full mt-5"
                        defaultValue={[30]} 
                        max={80} 
                        step={1} 
                        min={1} 
                        onValueChange={handleSliderValueChange}
                        disabled={algoState === 2}
                        name={"Number of Elements"}
                        id={'bars-slider'}
                    />
                </div>

                <div className='buttons-column mt-24 flex flex-col w-full gap-2'>
                    <div className='scramble-and-run-buttons flex gap-2'>
                        <Button onClick={handleRunScramble} disabled={algoState===2} className="w-[49%]">Scramble</Button>
                        <Button onClick={handleRunSort} disabled={algoState===2} className="w-[49%]">Run</Button>
                    </div>

                    {
                        algoState === 2
                        &&
                        <Button onClick={stopAlgorithm} className="w-full flex items-center justify-center" variant="destructive">
                            <div className='w-[15px] h-[15px] bg-white' />
                        </Button>
                    }
                </div>



            </div>


        </div>
    );
}

export default SortingControls
