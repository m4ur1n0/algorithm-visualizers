export const bfs = (grid, start_x, start_y, setVisited) => {
    if (!start_x || !start_y || !grid || !setVisited) {
        return false;
    }

    const rows = grid.length;
    const cols = grid[0].length;

    const next = [];
    const visited = new Set();  // Track visited cells to avoid reprocessing

    // Initialize the queue with the starting point
    next.push({ x: start_x, y: start_y });

    // Directions for traversing 4 direct neighbors (up, down, left, right)
    const directions = [
        { dx: 0, dy: 1 },  // down
        { dx: 0, dy: -1 }, // up
        { dx: 1, dy: 0 },  // right
        { dx: -1, dy: 0 }, // left
    ];

    // BFS Loop
    while (next.length > 0) {
        const current = next.shift();  // Get the first element from the queue
        const { x, y } = current;

        // Check if we have reached the goal
        if (grid[y][x].type === 5) {
            console.log("Found the end cell at", x, y);
            return true;  // Or return the path, depending on implementation
        }

        // Check if this cell is already visited
        if (visited.has(`${x},${y}`)) {
            continue; // Skip if the cell has been visited
        }

        // Mark this cell as visited
        visited.add(`${x},${y}`);
        setVisited(x, y); // Call the setVisited function to update the cell state

        // Loop through all neighbors
        for (let { dx, dy } of directions) {
            const newX = x + dx;
            const newY = y + dy;

            // Make sure the new cell is within bounds
            if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
                const neighbor = grid[newY][newX];

                // If the cell is a valid cell to move to (not a wall)
                if (neighbor.type !== 3 && !visited.has(`${newX},${newY}`)) {
                    next.push({ x: newX, y: newY });
                }
            }
        }
    }

    // If we exit the loop, no path was found
    return false;
}
