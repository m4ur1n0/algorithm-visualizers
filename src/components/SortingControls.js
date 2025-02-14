import { useSortingContext } from '@/context/SortingContext';
import { Button } from './ui/button';
import React, { useRef, useState } from 'react'

import { randomize, selectionSort, bubbleSort } from '@/app/utils/sorting-algorithms';
import { Slider } from './ui/slider';

function SortingControls() {

    const { positions, swapPositions, barValues, algoState, setAlgoUnsorted, setAlgoSorted, setAlgoRunning, setNum} = useSortingContext();
    const [selectedAlgo, setSelectedAlgo] = useState('selection-sort');

    const preempter = useRef({ shouldStop: false });

    function stopAlgorithm() { 
        preempter.current.shouldStop = true; 
        setAlgoUnsorted(); // preemption happens mid-run, algo must be reset
    }

    function handleSliderValueChange(value) {

        setNum(value);

    }


    return (
        <div className='w-[26%] h-full rounded-lg border border-gray-300 px-4 py-8'>
            {/* SORTING STOP AND TITLE */}
            <div className="control-panel-title flex flex-row items-center w-full h-[10%]">
                <h1>Controls</h1>
                {
                    // only if algorithm actively running
                    (algoState === 2) &&
                    <Button
                        className='rounded-full scale-[0.8] h-[44px] w-[44px] ml-56 mb-2'
                        variant="destructive"
                        onClick={stopAlgorithm} 
                    >
                        <div className='bg-white w-[12px] h-[12px]' />
                    </Button>}
            </div>
            
            {/* SELECT ALGORITHM DROPDOWN */}
            <div className='actual-controls w-full flex flex-col justify-start items-center'>


                
                <label htmlFor='bars-slider' className='w-full text-start mb-3 text-sm font-semibold'>Number of Elements</label>
                <Slider 
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


        </div>
    );
}

export default SortingControls
