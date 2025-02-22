
const delay = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function bubbleSort(positions, swapTwo, preempter) {
    // every index of position (0, 1, 2...) is actually represents where each value is
    // so positions[3] returns the index in the list of bars where the bar of value 3 is actually found.
    // so the goal is actually to sort by comparing indices of i and i+1
    // i.e. the actual bar value at any point in positions is positions.indexOf(i) (if i == 4, it will return the number where 4 is located on the bar graph)
        // if positions.indexOf(i)

    const n = positions.length;
    let localPos = [...positions];
    const ideal = Array.from({length : n}, (_, k) => k)

    while (JSON.stringify(localPos) !== JSON.stringify(ideal)) {
        if (preempter.shouldStop) {
            return;
        }
        for (let i = 0; i < n - 1; i++) {
            if (preempter.shouldStop) {
                return;
            }
            let j = localPos.indexOf(i);
            let k = localPos.indexOf(i + 1);

            if (j > k) {
                // then just hit the swapski

                await delay(400);
                await swapTwo(j, k);
                await delay(250);

                [ localPos[j], localPos[k] ] = [ localPos[k], localPos[j] ];

            }

        }
    }

}

export async function selectionSort(positions, swapTwo, preempter) {
    // trivial sort algorithm
    // positions is a list showing index rendered
        // a particular VALUE is at position positions[VALUE];
        // bar 0 CURRENTLY has VALUE positions[0]
        // therefore we only need to sort positions

    const len = positions.length;
    let myPositions = [...positions];

    for (let iteration = 0; iteration < len; iteration++) {
        if (preempter.shouldStop) {
            return;
        }
        // let iterVal = positions[iteration];
        let iterVal = myPositions[iteration];

        // let index = iteration;

        let minIndex = iteration;
        let minVal = iterVal;

        for (let index = iteration + 1; index < len; index++) {
            if (preempter.shouldStop) {
                return;
            }
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