"use client"

import React, { useState } from 'react'
import SortingBars from './SortingBars'
import { Button } from './ui/button'

const SortingBarGraph = () => {

    const dummy_bars_array = [
        {
            value : 1
        },
        {
            value : 2
        },
        {
            value : 3
        },
        {
            value : 4
        },
        {
            value : 5
        },
        {
            value : 6
        },
        {
            value : 7
        },
        {
            value : 8
        },
        {
            value : 9
        },
        {
            value : 10
        },
        {
            value : 11
        },
        {
            value : 12
        },
    ]

    const [dummyVals, setDummyVals] = useState(dummy_bars_array);

    // function switchTwo() {
    //     const min = 0;
    //     const max = dummyVals.length -1;

    //     let idx1 = Math.floor(Math.random() * (max - min + 1) + min)
    //     let idx2 = Math.floor(Math.random() * (max - min + 1) + min)

    //     if (idx1 !== idx2) {
    //         setDummyVals(prev => {
    //             const newDummyVals = [...prev];
    //             [newDummyVals[idx1], newDummyVals[idx2]] = [newDummyVals[idx2], newDummyVals[idx1]];
    //             return newDummyVals;
    //         })
    //     } else {
    //         switchTwo();
    //     }

    // }

    const [positions, setPositions] = useState(dummy_bars_array.map((_, index) => index));

    function switchTwo() {
        const max = positions.length - 1;
        const idx1 = Math.floor(Math.random() * (max + 1));
        const idx2 = Math.floor(Math.random() * (max + 1));

        if (idx1 !== idx2) {
            setPositions(prev => {
                const newPositions = [...prev];
                [newPositions[idx1], newPositions[idx2]] = [newPositions[idx2], newPositions[idx1]];
                return newPositions;
            });
        } else {
            switchTwo();
        }
    }


  return (
    <div className='sorting-bar-graph-container flex w-screen h-screen'>
        <Button className='' variant='secondary' onClick={switchTwo}>Swap</Button>
        {/* <div className='sorting-bar-graph w-full h-full'> */}
            {/* need some sort of measurements or something here */}
        <SortingBars values_array={dummyVals} positions={positions} />
        
        {/* </div> */}
    </div>
  )
}

export default SortingBarGraph
