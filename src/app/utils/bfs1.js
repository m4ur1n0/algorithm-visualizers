 // type has one of the following values : 
    //      blank -- empty, nothing (yet) -- 0
    //      viewed -- set as a pathfinding algorithm actually views the cell -- 1
    //      path -- a part that has been selected as a given path -- 2
    //      wall -- a barrier in a pathfinding property -- 3
    //      start -- the starting cell -- 4
    //      end -- the goal cell -- 5

export const bfs = (grid, start_x, start_y, setVisited) => {
    if(!start_x || !start_y || !grid || !setVisited) {
        return false;
    }

    const rows = grid.length;
    const cols = grid[0].length;




    const next = [];

    // go through each direct neighbor, visit, return if found end

    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            if (i ===0 && j===0) continue;

            let y = start_y + i;
            let x = start_x + j;

            if (y < 0 || x < 0 || y > rows || x > cols) {
                continue;
            }

            const visiting = grid[y][x];

            if(visiting.type === 5) {
                return true;
            }
            if(visiting.type ===0) {
                setVisited(x, y);
                next.push({x, y});
            }

        }
    }

    if (next.length===0) return false;
    next.forEach((coord) => {
        return bfs(grid, coord.start_x, coord.start_y, setVisited);
    })
    
}