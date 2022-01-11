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
