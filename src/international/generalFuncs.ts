

interface GeneralFuncs {
    findEnergy(creep: Creep): void
}


export const generalFuncs: Partial<GeneralFuncs> = {}

generalFuncs.findEnergy = function findEnergy(creep) {
    const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
        filter: resource => resource.resourceType == RESOURCE_ENERGY
    })

    var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => { structure.structureType == STRUCTURE_CONTAINER && structure.id != creep.room.memory.spawnContainerID }
    })

    if (droppedEnergy.length == 0 && containers.length == 0) return

    if (droppedEnergy.length != 0 && containers.length != 0) {
        const closestdroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)

        const closestContainer = creep.pos.findClosestByRange(containers)

        const path1 = creep.pos.findPathTo(closestdroppedEnergy);
        const path2 = creep.pos.findPathTo(closestContainer);

        if (path1.length > path2.length) {
            if (creep.pickup(closestdroppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestdroppedEnergy)
            }
        }
        else {
            if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestContainer)
            }
        }
    }

    if (droppedEnergy.length == 0) {

        const closestContainer = creep.pos.findClosestByRange(containers)

        if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestContainer)
        }

    }

    if (containers.length == 0) {
        const closestdroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)

        if (creep.pickup(closestdroppedEnergy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestdroppedEnergy)
        }

    }
}
