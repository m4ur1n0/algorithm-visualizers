import { useSortingContext } from '@/context/SortingContext';
import { Button } from './ui/button';
import React, { useRef, useState } from 'react'

import { randomize, selectionSort } from '@/app/utils/sorting-algorithms';

function SortingControls() {

    const { positions, swapPositions, barValues } = useSortingContext();
    const [algoRunning, setAlgoRunning] = useState();

    const preempter = useRef({ shouldStop: false });

    // function switchTwo() {
    //     const max = positions.length;
    //     const idx1 = Math.floor(Math.random() * (max));
    //     const idx2 = Math.floor(Math.random() * (max));

    //     if (idx1 !== idx2) {
    //         swapPositions(idx1, idx2);
    //     } else {
    //         switchTwo();
    //     }
    // }

    return (
        <div className='w-[26%] h-full rounded-lg border border-gray-300 px-4 py-8'>
            {/* SORTING STOP AND TITLE */}
            <div className="control-panel-title flex flex-row items-center w-full h-[10%]">
                <h1>Controls</h1>
                {
                    // only if algorithm actively running
                    (algoRunning === 1) &&
                    <Button
                        className='rounded-full scale-[0.8] h-[44px] w-[44px] ml-56 mb-2'
                        variant="destructive"
                        onClick={() => { preempter.current.shouldStop = true; setAlgoRunning(2); } } // preemption happens mid-run, algo must be reset
                    >
                        <div className='bg-white w-[12px] h-[12px]' />
                    </Button>}
            </div>

            {/* <Button className='' variant='secondary' onClick={switchTwo}>Swap</Button> */}
            <Button className='' variant='secondary' onClick={() => randomize(positions, swapPositions)}>Randomize</Button>
            <Button className='' variant='primary' onClick={() => selectionSort(positions, barValues, swapPositions)}>Selection Sort</Button>


            {/* SELECT ALGORITHM DROPDOWN */}


        </div>
    );
}

export default SortingControls
