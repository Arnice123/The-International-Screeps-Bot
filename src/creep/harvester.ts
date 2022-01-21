/*
 This script handles the code for the harvester class
*/

import { all, filter } from "lodash";


var roleHarvester = {

    run: function (creep: Creep) {

        var sources = creep.room.find(FIND_SOURCES)

        const closestSource = creep.pos.findClosestByRange(sources)

        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_CONTAINER }
        })

        const closestContainer = creep.pos.findClosestByPath(containers)

        if (!closestContainer) {
            if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE)
                creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } })
        }

        if (creep.pos.getRangeTo(closestContainer.pos) == 0) {
            creep.harvest(closestSource)
            return
        }

        creep.moveTo(closestContainer, { visualizePathStyle: { stroke: '#ffaa00' } })

    }
};


