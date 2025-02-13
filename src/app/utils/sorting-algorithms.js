
// export async function selectionSort(barPositions, swapTwo) {

//     // trivial sort algorithm

//     console.log(`receiving bar values : ${JSON.stringify(barValues)}`);

//     let minIndex = -1;
//     let minVal = 999;
//     const len = barPositions.length;

//     for (let iteration = 0; iteration < len; iteration++) {
//         let primaryIdx = barPositions[iteration];
//         let index = iteration;

//         minIndex = barPositions[iteration];
//         minVal = barValues[primaryIdx]["value"];

//         for (index = iteration + 1; index < len; index++) {
//             let actualIdx = barPositions[index];
//             console.log(`looking at bar value : ${JSON.stringify(barValues[actualIdx])}`)
//             let currVal = barValues[actualIdx]["value"];
//             if (currVal < minVal) {
//                 minVal = currVal;
//                 minIndex = actualIdx;
//             }
//         }

//         if (minIndex !== iteration) { // i.e. if we have found someone to swap buddy with
//             await swapTwo(iteration, index);
//             console.log(`attempted to swap [${iteration}] with [${index}]`);
//         }
        
        

//     }

//     console.log(`POSITIONS AT END : ${JSON.stringify(barPositions)}\nVALUES AT END : ${JSON.stringify(barValues)}`);

// }

const delay = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function selectionSort(positions, swapTwo) {
    // trivial sort algorithm
    // positions is a list showing index rendered
        // a particular VALUE is at position positions[VALUE];
        // bar 0 CURRENTLY has VALUE positions[0]
        // therefore we only need to sort positions

    const len = positions.length;
    let myPositions = [...positions];

    for (let iteration = 0; iteration < len; iteration++) {
        // let iterVal = positions[iteration];
        let iterVal = myPositions[iteration];

        // let index = iteration;

        let minIndex = iteration;
        let minVal = iterVal;

        for (let index = iteration + 1; index < len; index++) {
            // let currVal = positions[index];
            let currVal = myPositions[index];

            if (currVal < minVal) {
                minVal = currVal;
                minIndex = index;
            }
        }

        if (minIndex !== iteration) {
            await delay(400);
            await swapTwo(iteration, minIndex);
            [myPositions[minIndex], myPositions[iteration]] = [myPositions[iteration], myPositions[minIndex]];
            await delay(250);
        }

    }


    
}


export async function randomize(barPositions, swapTwo) {

    const len = barPositions.length;

    for (let idx = 0; idx < len; idx++) {
        let i = Math.floor(Math.random() * (len - 1));
        let j = Math.floor(Math.random() * (len - 1));

        await swapTwo(i, j);
    }

}