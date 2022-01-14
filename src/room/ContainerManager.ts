/*
    this coded will check to see if you need to place a container
*/


    // creating a rectangle shape

    interface rectanngle {
        x1: number
        y1: number
        x2: number
        y2: number
    }

    // creating a position type

    interface Position {
        x: number
        y: number
    }


export function CheckIfContainerIsNeeded(room:Room, controller: StructureController, spawn: StructureSpawn): boolean {

    const rect: rectanngle = {
        x1: controller.pos.x - 2,
        y1: controller.pos.y - 2,
        x2: controller.pos.x + 2,
        y2: controller.pos.y + 2
    }


    const containerPos = findBestSpot()

    const look = room.lookForAt(LOOK_STRUCTURES, containerPos.x, containerPos.y)

    if (look[0].structureType != STRUCTURE_CONTAINER)
    {
        return true
    }
    else{
        return false
    }


    function findBestSpot() {

        let terrain = room.getTerrain()

        // getting all of the positions that are not occupied by walls

        const AllPosiblePossitions: Position[] = findPositionsInsideRect(rect)

        // creating the variable for the shortest path to spawn from the availible positons

        let shortestpath: PathStep[]

        // getting the position that will be the containers location

        let chosenPosition: RoomPosition

        // getting all the availible positions and finding out what position to chose

        for (var positions in AllPosiblePossitions) {

            // creating a room position with the given pos

            const tempPos = new RoomPosition(AllPosiblePossitions[positions].x, AllPosiblePossitions[positions].y, room.name)

            // creating a path to the spawn to find out the shortest route

            const tempPath = tempPos.findPathTo(spawn)

            // if the temporary path is shorter that the previus one make it the chosen pos

            if (tempPath.length < shortestpath.length) {
                shortestpath = tempPath
                chosenPosition = tempPos
            }

            // if this is the first iteration automatically make it the chosen one

            if (positions == '0') {
                shortestpath = tempPath
                chosenPosition = tempPos
            }
        }

        return chosenPosition

        function findPositionsInsideRect(rect: rectanngle) {
            // the array that will contain all of the availible positions

            var availiblePositions = []

            // loop through each position

            for (let x = rect.x1; x <= rect.x2; x++) {
                for (let y = rect.y1; y <= rect.y2; y++) {

                    // this checks to see if it is a possible position

                    if (ReturnAvailiblePos(x, y) != null) {

                        // if it works add the position

                        const position: Position = { x: x, y: y }
                        availiblePositions.push(position)
                    }

                }
            }

            // return all of the availible positions

            return availiblePositions
        }

        // this function checks to see if there is a wall on that location

        function ReturnAvailiblePos(x: number, y: number) {
            var availiblePos: Position = {
                x: x,
                y: y
            }

            switch (terrain.get(x, y)) {
                case 1:
                    return null
            }

            return availiblePos
        }
    }
  }
