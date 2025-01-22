 // type has one of the following values : 
    //      blank -- empty, nothing (yet) -- 0
    //      viewed -- set as a pathfinding algorithm actually views the cell -- 1
    //      path -- a part that has been selected as a given path -- 2
    //      wall -- a barrier in a pathfinding property -- 3
    //      start -- the starting cell -- 4
    //      end -- the goal cell -- 5

export const bfs = async (grid, start_x, start_y, setVisited, setPath, endList, stopper) => {
    try {
        if(!start_x || !start_y || !grid || !setVisited || !setPath) {
            return [];
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

            if (stopper.shouldStop) {
                return [];
            }


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

export const dfs = async (grid, start_x, start_y, setVisited, setPath, endList, stopper) => {
    try {
        if(!start_x || !start_y || !grid || !setVisited || !setPath) {
            return [];
        }

        console.log("dfs");

        const stack = [];
        const height = grid.length;
        const width = grid[0].length;

        const visited = new Set();

        stack.push([{x : start_x, y : start_y}, [{x : start_x, y : start_y}]]);

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

        while(stack.length !== 0) {

            if (stopper.shouldStop) {
                return [];
            }

            const current = stack.pop();
            let x = current[0].x;
            let y = current[0].y;
            console.log(`x : ${x} , y : ${y}`);
            const currPath = current[1]

            if (!visited.has(`${x},${y}`)) {
                visited.add(`${x},${y}`);
                await setVisited(x, y);

                for(const {dx, dy} of directions) {
                    const newX = x + dx;
                    const newY = y + dy;
                    const n = {x : newX, y: newY};

                    if(newX >= 0 && newX < width && newY >= 0 && newY < height) {
                        if (grid[newY][newX].type === 5) {
                            return [...currPath, n];
                        }

                        if (grid[newY][newX].type === 0) {
                            stack.push([n, [...currPath, n]]);
                        }
                    }
                }
            }


        }

        //failure
        return [];

    } catch (err) {
        console.log("error ocurred during dfs", err);
        return [];
    }
}




function getSquareDist(x1, y1, x2, y2) {
    // console.log(`finding dist btw (${x1},${y1}) and (${x2},${y2})`);
    return ((x1-x2)**2)+((y1-y2)**2);
}

function getClosestEnd(x, y, endList) {
    let closestCoord = endList[0];
    let closest = getSquareDist(x, y, endList[0].x, endList[0].y);

    for(const coord of endList) {
        const dist = getSquareDist(x, y, coord.x, coord.y);
        if (dist < closest) {
            closestCoord = coord;
            closest = dist;
        }
    }

    return closestCoord;
}

// function calculateF(x, y, endX, endY, g) {
//     // g is always 1 + parent

//     let h = getSquareDist(x, y, endX, endY);
//     return h + g;

// }


function insertIntoPriQ(priorityList, newNode) {
    for (let i = 0; i < priorityList.length; i++) {
        if (
            newNode.f > priorityList[i].f ||
            (newNode.f === priorityList[i].f && newNode.h > priorityList[i].h)
        ) {
            priorityList.splice(i, 0, newNode);

            // console.log(`added to list : ${JSON.stringify(newNode)}`);
            return priorityList;
        }
    }

    priorityList.push(newNode); // Push if no better position was found
    return priorityList;
}

function search_open_list(openList, nodeXY) { // can use .map() to make this constant time

    for(const node of openList) {
        if (node.x === nodeXY.x && node.y === nodeXY.y) {
            return node;
        }
    }

    return null;
}

function remove_cell_from_array(arr, nodeXY) {

    if (nodeXY == null) {
        return arr;
    }

    for(let i = 0; i < arr.length; i++) {
        const node = arr[i];
        if (node.x === nodeXY.x && node.y === nodeXY.y) {
            arr.splice(i,1);
        }
    }

    return arr;

}

function traverse_parents(parents, endNode) {
    const path = [{x : endNode.x, y : endNode.y}]
    let key = `${endNode.x},${endNode.y}`;

    while (parents[key] !== 0 && parents[key] !== undefined) {
        const node = parents[key];
        path.push({x : node.x, y : node.y});
        key = `${node.x},${node.y}`;
    }

    return path.reverse();
}

export const a_star = async (grid, start_x, start_y, setVisited, setPath, endList, stopper) => {

    // needs endList format : [{x, y}, {x, y}... etc]

    try {
        if(!start_x || !start_y || !grid || !setVisited || !setPath) {
            return [];
        }

        console.log('a*');

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

        const seekingEnd = getClosestEnd(start_x, start_y, endList);

        const endX = seekingEnd.x;
        const endY = seekingEnd.y;

        let g = 0; // distance -- between currNode and startNode
        let h = getSquareDist(start_x, start_y, endX, endY); // heuristic -- squared distance between currNoode and endNode
        let f = g + h; // cost -- g + h

        const startKey = `${start_x},${start_y}`;

        let openList = [{x : start_x, y : start_y, f, g, h}];
        let parents = {
            [startKey] : 0,
        }
        let closedList = [];

        
        while (true) {

            if (stopper.shouldStop) {
                console.log("stopping?");
                return [];
            }

            // consider node with lowest f in open list
            if (openList.length === 0) {
                // console.log("No path found");
                return [];
            }

            
            const lowestFCell = openList.pop();
            // console.log(`lowest f cell : ${JSON.stringify(lowestFCell)}`);

            if(grid[lowestFCell.y][lowestFCell.x].type===5) {
                // if we have found the end, return
                return traverse_parents(parents, lowestFCell)
            }

            closedList.push(lowestFCell);
            const promises = [];

            // console.log(`traversing neighbors of ${JSON.stringify(lowestFCell)}`)
            for(const {dx, dy} of directions) {
                const nextCell = {x : lowestFCell.x + dx, y : lowestFCell.y + dy};
                if (
                    nextCell.x < 0 || nextCell.x >= grid[0].length ||
                    nextCell.y < 0 || nextCell.y >= grid.length
                ) {
                    continue;
                }
                const cellKey = `${nextCell.x},${nextCell.y}`;
                const parent = parents[cellKey];

                // console.log("getting here");
                let g;
                if (parent===0 || parent===undefined) {
                    g = 1;
                } else {
                    g = parent.g + 1;
                }
                // console.log("also getting here");


                let h = getSquareDist(nextCell.x, nextCell.y, endX, endY);
                let f = g + h;

                const type = grid[nextCell.y][nextCell.x].type;

                if(type === 0 || type === 5) {
                    const versionInClosedList = search_open_list(closedList, nextCell);
                    if (versionInClosedList === null) {
                        const versionInOpenList = search_open_list(openList, nextCell);
                        if (versionInOpenList === null || versionInOpenList.g > g) {
                            // then we are actually considering it --
                            promises.push(setVisited(nextCell.x, nextCell.y))
                            openList = remove_cell_from_array(openList, versionInOpenList);

                            openList = insertIntoPriQ(openList, {
                                x: nextCell.x,
                                y: nextCell.y,
                                f,
                                g,
                                h
                            });
                            const key=`${nextCell.x},${nextCell.y}`;
                            parents[key] = lowestFCell;
                        }
                    }
                }

            }

            await Promise.all(promises);

            

        }



    } catch (err) {
        console.log("error ocurred during a* pathfinding", err);
        return [];
    }

}

function get_direction() {
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

    const randint = Math.floor(Math.random() * 4);
    // console.log(randint);

    return directions[randint];

}


export const random_walk = async (grid, start_x, start_y, setVisited, setPath, endList, stopper) => {

    const width = grid[0].length;
    const height = grid.length;

    let curr = {x : start_x, y : start_y};

    const path = [curr];
    

    const endXs = new Set()
    const endYs = new Set()
    const visited = new Set();

    for(const endNode of endList) {
        endXs.add(endNode.x);
        endYs.add(endNode.y);
    }

    while (!(endXs.has(curr.x)&&endYs.has(curr.y))) {

        if(stopper.shouldStop) {
            return [];
        }

        visited.add(`${curr.x},${curr.y}`);
        await setVisited(curr.x, curr.y);

        path.push(curr);

        const {dx, dy} = get_direction();
        const next = {x : curr.x + dx, y : curr.y + dy};

        if(next.x < width && next.y < height && next.x >= 0 && next.y >= 0 && !visited.has(`${next.x},${next.y}`)) {
            curr = next;

        }
        
    }

    return path;

}
