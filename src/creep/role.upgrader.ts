var roleUpgrader = {


    run: function (creep: Creep) {
        const myHardcodedRoomName = "E29N11";
        const room = Game.rooms[myHardcodedRoomName]

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 I vant de energy');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES,
                { filter: { resourceType: RESOURCE_ENERGY } })

            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)

            var containers: StructureContainer[] = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                    i.store[RESOURCE_ENERGY] > 0
            })

            const closestContainer = creep.pos.findClosestByRange(containers)

            if (closestDroppedEnergy.amount > closestContainer.store.energy) {
                HarvestDropped(creep, closestDroppedEnergy)
            }
            else {
                HarvestContainer(creep, closestContainer, closestDroppedEnergy)
            }
        }
    }
};

