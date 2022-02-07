/*
for (var locations in targets)
{
    let dist = creep.pos.getRangeTo(targets[locations])
    var chosenDist;

    if (chosenDist == null)
    {
        chosenDist = targets[0]
    }

    if (dist <= chosenDist && chosenDist != null)
    {
        chosenDist = targets[locations]
    }
}

    if(creep.transfer(chosenDist, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(chosenDist, {visualizePathStyle: {stroke: '#ffffff'}});
    }
*/

/*
var targets = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {

                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
*/

//Game.rooms.createConstructionSite(Memory.path2[pos].x, Memory.path2[pos].y, STRUCTURE_ROAD)
/*
/*
 * This code is here to automatically place roads so the travel will allways be optimized
*/
/*
    // create a path from the spawn to the energy sources
    const path1 = Game.spawns['Arnice123 First'].pos.findPathTo(Game.flags.SOURCE1.pos)
    const path2 = Game.spawns['Arnice123 First'].pos.findPathTo(Game.flags.SOURCE2.pos)

    // Serilizing the paths
    Memory.path1 = path1
    Memory.path2 = path2

// function that will be called every 25 tics in order to find missing paths
function FindEmptySites()
{
    if (Game.constructionSites.length >= 100)
        return

    // Getting the room terrain
    const terrain = Game.rooms['E32N8'].getTerrain()

    // for each position in the path there should be a road
    for (var pos in Memory.path1)
    {
       switch(terrain.get(Memory.path1[pos].x, Memory.path1[pos].y))
       {
            // if there is floor or a swamp place a road on that position
            case TERRAIN_MASK_SWAMP:
                Game.Memory.path1[pos].pos.createConstructionSite(STRUCTURE_ROAD)
                break
            case 0:
                Game.Memory.path1[pos].pos.createConstructionSite(STRUCTURE_ROAD)
                break
       }
    }

    //same thing as previously
    for (var pos in Memory.path2)
    {
       switch(terrain.get(Memory.path2[pos].x, Memory.path2[pos].y))
       {
            case TERRAIN_MASK_SWAMP:
                Game.Memory.path2[pos].pos.createConstructionSite(STRUCTURE_ROAD)
                break
            case 0:
                Game.Memory.path2[pos].pos.createConstructionSite(STRUCTURE_ROAD)
                break
       }
    }

}

module.exports = FindEmptySites()

*/

/*function SpawnInHarvester() {

        if (spawnEnergyAvailable <= 300) {
            var newName = 'Harvester(T1)' + Game.time
            console.log('Spawning new harvester(T1): ' + newName)
            Game.spawns['Arnice123'].spawnCreep([WORK, WORK, MOVE], newName,
                { memory: { role: 'harvester' } })
        }

        if (spawnEnergyAvailable > 300 && spawnEnergyAvailable <= 400) {
            var newName = 'Harvester(T2)' + Game.time
            console.log('Spawning new harvester(T2): ' + newName)
            Game.spawns['Arnice123'].spawnCreep([WORK, WORK, WORK, WORK, MOVE], newName,
                { memory: { role: 'harvester' } })

        }

        if (spawnEnergyAvailable > 400 && spawnEnergyAvailable <= 600) {
            var newName = 'Harvester(T3)' + Game.time
            console.log('Spawning new harvester(T3): ' + newName)
            Game.spawns['Arnice123'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], newName,
                { memory: { role: 'harvester' } })

        }

    }*/


    /*
        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[0])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[1])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[2])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[3])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[4])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[5])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[6])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[7])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[8])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[9])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[10])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[11])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[12])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[13])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[14])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[15])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }

        for (var sites in constructionSites) {
            if (constructionSites[sites].structureType = structureTypesByBuildPriority[16])
            {
                creep.room.memory.chosenBuildID = constructionSites[sites].id
                return
            }
        }*/

        /*

export var roleBuilder = {

    run: function (creep: Creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false
            creep.say('🔄 Gib Energy')
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true
            creep.say('🚧 build')
        }

        const chosenSiteID = creep.room.memory.chosenBuildID
        const constructionSite = Game.getObjectById(creep.room.memory.chosenBuildID)

        if (creep.memory.building) {
            if (chosenSiteID != null) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite, { visualizePathStyle: { stroke: '#ffffff' } })
                }
            }

        }
        else {
            if (Memory.chosenBuildEnergy != null)
            {
                const energyToHarvest = Game.getObjectById(Memory.chosenBuildEnergy)

                if (creep.pickup(energyToHarvest) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyToHarvest)
                }
            }
            else{
                const energyToHarvest = Game.getObjectById(Memory.chosenBuildContainer)

                if (creep.withdraw(energyToHarvest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyToHarvest)
                }
            }

        }
    }
}

        */

/*
/*
    this coded will check to see if you need to place a container
*/
/*
import { contains, filter } from "lodash"


// creating a rectangle shape

interface Rectanngle {
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


export function CheckIfContainerIsNeeded(room: Room, controller: StructureController, spawn: StructureSpawn): boolean {








    const containerPos = findBestSpot()



    const look = room.lookForAt(LOOK_STRUCTURES, containerPos)

    const contain: StructureContainer[] = room.find(FIND_STRUCTURES, {
        filter: { structureType: STRUCTURE_CONTAINER }
    })

    for (var container in contain) {
        if (contain[container].pos == containerPos) {
            room.memory.spawnContainerID = contain[container].id
            return false
        }
    }

    return true


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

        function findPositionsInsideRect(rect: Rectanngle) {
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


*/
