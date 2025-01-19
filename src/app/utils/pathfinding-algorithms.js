 // type has one of the following values : 
    //      blank -- empty, nothing (yet) -- 0
    //      viewed -- set as a pathfinding algorithm actually views the cell -- 1
    //      path -- a part that has been selected as a given path -- 2
    //      wall -- a barrier in a pathfinding property -- 3
    //      start -- the starting cell -- 4
    //      end -- the goal cell -- 5

export const bfs = async (grid, start_x, start_y, setVisited, setPath, end_x, end_y) => {
    try {
        if(!start_x || !start_y || !grid || !setVisited || !setPath) {
            return false;
        }
        
        const queue = [];
        const visited = new Set();
        const height = grid.length;
        const width = grid[0].length;
        
        // push start to the queue, mark as visited
        queue.push([{x : start_x, y : start_y}, [{x : start_x, y : start_y}]]);
        visited.add(`${start_x},${start_y}`);
        
        const directions = [ // don't want to include diagonals because paths should be real
            {
                dx : 0, dy : -1 // up
            },
            {
                dx : 0, dy : 1 // down
            },
            {
                dx : -1, dy : 0 // left
            },
            {
                dx : 1, dy : 0 // right
            }
        ]
        
        const promises = [];

        while(queue.length > 0) {
            const [{x, y}, currPath] = queue.shift();
            const cell = grid[y][x];
        
            // check if it is the END
            if (cell.type === 5) {
                
                return currPath; // eventually return path
            }
        
        
            // next to visit
            for (const {dx, dy} of directions) {
                const newX = x + dx;
                const newY = y + dy;
        
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    const key = `${newX},${newY}`;
                    if (!visited.has(key) && (grid[newY][newX].type === 0 || grid[newY][newX].type === 5)) {
                    // if (grid[newY][newX].type === 5) {
                    //     visited.add(key);
                    //     queue.push([{x : newX, y : newY}, [...currPath, {x : newX, y : newY}]]);
                    //     continue;
                    // }
                        visited.add(key);
                        promises.push(setVisited(newX, newY));
                        queue.push([{x : newX, y : newY}, [...currPath, {x : newX, y : newY}]]);
                    }              
                }
            }


            
        
        
        }
        
        await Promise.all(promises);
        
        // queue empty and we haven't found the goal?
        return [];
    } catch (err) {
        console.log(`error ocurred in bfs`, err);
    } finally {
        console.log(`bfs complete`);
    }
    
}

export const dfs = async (grid, start_x, start_y, setVisited, setPath, end_x, end_y) => {

}