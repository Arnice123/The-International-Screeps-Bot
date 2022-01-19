/*
    This code does the stuff for the builder
*/

var roleBuilder = {

    run: function (creep: Creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false
            creep.say('🔄 Gib Energy')
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true
            creep.say('🚧 build')
        }

        var targets = creep.room.find(FIND_CONSTRUCTION_SITES)

        if (creep.memory.building) {
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } })
                }
            }
        }
        else {
            var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES,
                { filter: { resourceType: RESOURCE_ENERGY } })

            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)

            var containers = creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_CONTAINER }
            })

            const closestContainer = creep.pos.findClosestByPath(containers)

            const pathDropped = creep.pos.findPathTo(closestDroppedEnergy)
            const pathContainer = creep.pos.findPathTo(closestContainer)

            if (pathContainer.length > pathDropped.length) {
                if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDroppedEnergy.pos);
                }
            }
            else {
                if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestContainer);
                }
            }


        }
    }
}



