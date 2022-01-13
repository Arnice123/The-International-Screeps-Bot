


/*
 * This code is here to automatically place roads so the travel will allways be optimized
*/

import { Interface } from "readline";
import { Position } from "source-map";

// function that will be called every 10 tics in order to find missing paths

export function FindEmptySites() {

    //creating an instance of the room

    const myHardcodedRoomName = "E32N8";
    const room = Game.rooms[myHardcodedRoomName]

    // create a path from the spawn to the energy sources

    const path1 = Game.spawns['Arnice123'].pos.findPathTo(Game.flags.SOURCE1.pos)
    const path2 = Game.spawns['Arnice123'].pos.findPathTo(Game.flags.SOURCE2.pos)

    const constructSitesLength = Game.spawns['Arnice123'].room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: FIND_MY_CONSTRUCTION_SITES }
    })

    //if there are to many construction sites dont try

    if (constructSitesLength.length >= 100) {
        return
    }

    // Getting the room terrain

    var terrain = Game.rooms[myHardcodedRoomName].getTerrain()

    // for each position in the path there should be a road
    let i = 0
    for (var position in path1) {
        i++
        if (i == path2.length) {
            const placeConstructionSiteResult20 = room.createConstructionSite(path2[position].x, path2[position].y, STRUCTURE_CONTAINER)
            console.log(placeConstructionSiteResult20)
            continue
        }

        switch (terrain.get(path1[position].x, path1[position].y)) {

            // if there is floor or a swamp place a road on that position

            case TERRAIN_MASK_SWAMP:

                const placeConstructionSiteResult11 = room.createConstructionSite(path1[position].x, path1[position].y, STRUCTURE_ROAD)

                console.log(placeConstructionSiteResult11) // returns 0 or -7
                break

            case 0:
                const placeConstructionSiteResult12 = room.createConstructionSite(path1[position].x, path1[position].y, STRUCTURE_ROAD)

                console.log(placeConstructionSiteResult12)
                break

        }
    }
    i = 0
    //same thing as previous
    for (var position in path2) {
        i++
        if (i == path2.length) {
            const placeConstructionSiteResult20 = room.createConstructionSite(path2[position].x, path2[position].y, STRUCTURE_CONTAINER)
            console.log(placeConstructionSiteResult20)
            continue
        }

        switch (terrain.get(path2[position].x, path2[position].y)) {
            case TERRAIN_MASK_SWAMP:
                const placeConstructionSiteResult21 = room.createConstructionSite(path2[position].x, path2[position].y, STRUCTURE_ROAD)
                console.log(placeConstructionSiteResult21)
                break
            case 0:
                const placeConstructionSiteResult22 = room.createConstructionSite(path2[position].x, path2[position].y, STRUCTURE_ROAD)
                console.log(placeConstructionSiteResult22)
                break

        }
    }

    interface rectanngle {
        x1: number
        y1: number
        x2: number
        y2: number
    }

    interface Position {
        x: number
        y: number
    }

    function PlaceContainersByController(controller: StructureController) {
        // first check to see if we need to do that
        const rect: rectanngle = {
            x1: controller.pos.x - 2,
            y1: controller.pos.y - 2,
            x2: controller.pos.x + 2,
            y2: controller.pos.y + 2
        }

        const AllPosiblePossitions: Position[] = findPositionsInsideRect(rect)
        let shortestpath: PathStep[]
        let chosenPosition: RoomPosition

        for (var positions in AllPosiblePossitions) {
            const tempPos = new RoomPosition(AllPosiblePossitions[positions].x, AllPosiblePossitions[positions].y, room.name)
            const tempPath = tempPos.findPathTo(Game.spawns['Arnice123'])
            if (tempPath.length < shortestpath.length) {
                shortestpath = tempPath
                chosenPosition = tempPos
            }

            if (positions == '0') {
                shortestpath = tempPath
            }
        }

        const placeContainerSiteResult = room.createConstructionSite(chosenPosition, STRUCTURE_ROAD)
        console.log(placeContainerSiteResult)


    }

    function findPositionsInsideRect(rect: rectanngle) {
        var availiblePositions = []

        for (let x = rect.x1; x <= rect.x2; x++) {
            for (let y = rect.y1; y <= rect.y2; y++) {
                if (ReturnAvailiblePos(x, y) != null) {
                    const position: Position = { x: x, y: y }
                    availiblePositions.push(position)
                }

            }
        }

        return availiblePositions
    }

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

