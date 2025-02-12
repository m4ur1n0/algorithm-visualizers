
export async function selectionSort(barPositions, barValues, swapTwo) {

    // trivial sort algorithm

    console.log(`receiving bar values : ${JSON.stringify(barValues)}`);

    let minIndex = -1;
    let minVal = 999;
    const len = barPositions.length;

    for (let iteration = 0; iteration < len; iteration++) {
        let primaryIdx = barPositions[iteration];
        let index = iteration;

        minIndex = iteration;
        minVal = barValues[primaryIdx]["value"];

        for (index = iteration + 1; index < len; index++) {
            let actualIdx = barPositions[index];
            console.log(`looking at bar value : ${JSON.stringify(barValues[actualIdx])}`)
            let currVal = barValues[index]["value"];
            if (currVal < minVal) {
                minVal = currVal;
                minIndex = index;
            }
        }

        if (minIndex !== iteration) { // i.e. if we have found someone to swap buddy with
            await swapTwo(iteration, index);
            console.log(`attempted to swap [${iteration}] with [${index}]`);
        }
        
        

    }

    console.log(`POSITIONS AT END : ${JSON.stringify(barPositions)}\nVALUES AT END : ${JSON.stringify(barValues)}`);

}

export function randomize(barPositions, swapTwo) {

    const len = barPositions.length;

    for (let idx = 0; idx < len; idx++) {
        let i = Math.floor(Math.random() * (len - 1));
        let j = Math.floor(Math.random() * (len - 1));

        swapTwo(i, j);
    }

}