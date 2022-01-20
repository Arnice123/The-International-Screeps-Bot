/*
    This code does the stuff for the builder
*/

import { range } from "lodash"
import { memoryUsage } from "process"
import { Memory } from "../../test/unit/mock"

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

        var targets = creep.room.find(FIND_CONSTRUCTION_SITES)

        if (creep.memory.building) {
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } })
                }
            }
        }
        else {
            var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: (i) => i.resourceType == RESOURCE_ENERGY
            })

            var goodDroppedEnergy: Resource<ResourceConstant>[] = []

            for (var groundEnergy in droppedEnergy) {
                const range = creep.pos.getRangeTo(droppedEnergy[groundEnergy])
                if (droppedEnergy[groundEnergy].amount > (range / 2)) {
                    goodDroppedEnergy.push(droppedEnergy[groundEnergy])
                }
            }

            const closestDroppedEnergy = creep.pos.findClosestByRange(goodDroppedEnergy)

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
}

function HarvestContainer(creep: Creep, closestContainer: StructureContainer, closestDroppedEnergy: Resource<ResourceConstant>) {
    if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestContainer);
    }

    if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
        if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestDroppedEnergy.pos);
        }
    }
}

function HarvestDropped(creep: Creep, energy: Resource<ResourceConstant>) {
    if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
        creep.moveTo(energy.pos);
    }
}

function FindChosenSpot(goodDroppedEnergy: Resource<ResourceConstant>[], closestContainer: StructureContainer, creep: Creep) {
    var BestDroppedEnergyValue : number = 0
    let chosenDroppedEn: Resource<ResourceConstant>

    const range = creep.pos.getRangeTo(closestContainer)
    const containerVal = closestContainer.store.energy - range

    for (var en in goodDroppedEnergy) {
        const range = creep.pos.getRangeTo(goodDroppedEnergy[en])
        const enAmount = goodDroppedEnergy[en].amount
        const amountDegeneratingAtick = enAmount / 1000
        const valueOfThis = (enAmount - (range * amountDegeneratingAtick)) + 10

        if (valueOfThis > BestDroppedEnergyValue)
        {
            BestDroppedEnergyValue = valueOfThis
            chosenDroppedEn = goodDroppedEnergy[en]
        }
    }

    if (BestDroppedEnergyValue > containerVal)
    {
        
    }

}
