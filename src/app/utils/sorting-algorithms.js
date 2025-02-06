
export function selectionSort(barPositions, barValues, swapTwo) {

    // trivial sort algorithm

    let minIndex = -1;
    let minVal = 999;
    const len = barPositions.length;

    for (let iteration = 0; iteration <= len; iteration++) {
        let index=0;
        for (index = iteration; index <= len; index++) {
            let currVal = barValues[index].value;
            if (currVal < minVal) {
                minVal = currVal;
                minIndex = index;
            }
        }

        swapTwo(iteration, index);
        minIndex = iteration + 1;
        minVal = 999;
    }

}

export function randomize(barPositions, swapTwo) {

    const len = barPositions.length;

    for (let idx = 0; idx < len; idx++) {
        let i = Math.floor(Math.random() * len);
        let j = Math.floor(Math.random() * len);

        swapTwo(i, j);
    }

}