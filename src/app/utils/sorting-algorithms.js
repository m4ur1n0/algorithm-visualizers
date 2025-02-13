
const delay = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function bubbleSort(positions, swapTwo) {
    const n = positions.length;
    let localPos = [...positions];
    const ideal = Array.from({length : n}, (_, k) => k)

    while (JSON.stringify(localPos) !== JSON.stringify(ideal)) {
        for (let i = 0; i < n - 1; i++) {

            if (localPos[i] > localPos[i+1]) {
                // then just hit the swapski
                [localPos[i], localPos[i + 1]] = [localPos[i + 1], localPos[i]];

                await delay(400);
                swapTwo(i, i + 1);
                await delay(250);
            }

        }
    }

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