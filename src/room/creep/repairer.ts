// Repairer role

import { generalFuncs } from "international/generalFuncs"

export var roleRepairer = {

    // repair damaged structures
    run: function (creep: Creep) {

        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false
            creep.say('🔄 harvest')
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true
            creep.say('🛠️ repairing')
        }

        if (creep.memory.repairing) {

            // find closest damaged structure

            const damagedRamparts = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits < 10000 && structure.structureType == STRUCTURE_RAMPART)
            })

            const damagedWalls = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits < 10000 && structure.structureType == STRUCTURE_WALL)
            })

            if (damagedRamparts.length > 0) {
                const closestDamagedStructure = creep.pos.findClosestByRange(damagedRamparts)

                if (closestDamagedStructure) {
                    if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestDamagedStructure, { reusePath: 50 })
                    }
                }
            }
            else {
                const closestDamagedStructure = creep.pos.findClosestByRange(damagedWalls)

                if (closestDamagedStructure) {
                    if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestDamagedStructure, { reusePath: 50 })
                    }
                }
            }
        }
        else {
            // harvest energy from dropped energy

            generalFuncs.findEnergy(creep)
        }
    }
}
