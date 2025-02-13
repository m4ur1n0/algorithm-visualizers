import { useSortingContext } from '@/context/SortingContext';
import { Button } from './ui/button';
import React, { useRef, useState } from 'react'

import { randomize, selectionSort, bubbleSort } from '@/app/utils/sorting-algorithms';

function SortingControls() {

    const { positions, swapPositions, barValues, algoState, setAlgoUnsorted, setAlgoSorted, setAlgoRunning} = useSortingContext();

    const preempter = useRef({ shouldStop: false });


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
                        onClick={() => { 
                            preempter.current.shouldStop = true; 
                            setAlgoUnsorted(); // preemption happens mid-run, algo must be reset
                        }} 
                    >
                        <div className='bg-white w-[12px] h-[12px]' />
                    </Button>}
            </div>

            {/* <Button className='' variant='secondary' onClick={switchTwo}>Swap</Button> */}
            <Button className='mx-2' variant='secondary' onClick={() => randomize(positions, swapPositions)}>Randomize</Button>
            <Button className='mx-2' variant='primary' onClick={async () => {
                setAlgoRunning();
                await selectionSort(positions, swapPositions);
                setAlgoSorted();
            }}>Selection Sort</Button>

            <Button className='mx-2' variant='primary' onClick={async () => {
                setAlgoRunning();
                await bubbleSort(positions, swapPositions);
                setAlgoSorted();
            }}>Bubble Sort</Button>

            <Button className='mx-2' variant='primary' onClick={() => console.log(`vals : ${JSON.stringify(barValues)}\nposi : ${JSON.stringify(positions)}`)}>print</Button>
            <Button className='mx-2' variant="secondary" onClick={() => {setAlgoRunning()}}>running</Button>
            <Button className='mx-2' variant="secondary" onClick={() => {setAlgoUnsorted()}}>at mess</Button>
            <Button className='mx-2' variant="secondary" onClick={() => {setAlgoSorted()}}>at rest</Button>



            {/* SELECT ALGORITHM DROPDOWN */}


        </div>
    );
}

export default SortingControls
