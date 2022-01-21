/*
    This code does the stuff for the builder
*/


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

        var chosenSiteID = creep.room.memory.chosenBuildID
        const constructionSite = Game.getObjectById(creep.room.memory.chosenBuildID)

        if (creep.memory.building) {
            if (chosenSiteID != null) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite, { visualizePathStyle: { stroke: '#ffffff' } })
                }
            }

        }
        else {
            if (Memory.builderStructureType = "dropped")

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
    var BestDroppedEnergyValue: number = 0
    let chosenDroppedEn: Resource<ResourceConstant>

    const range = creep.pos.getRangeTo(closestContainer)
    const containerVal = closestContainer.store.energy - range

    for (var energ in goodDroppedEnergy) {
        const range = creep.pos.getRangeTo(goodDroppedEnergy[energ])
        const enAmount = goodDroppedEnergy[energ].amount
        const amountDegeneratingAtick = enAmount / 1000
        const valueOfThis = (enAmount - (range * amountDegeneratingAtick)) + 10

        if (valueOfThis > BestDroppedEnergyValue) {
            BestDroppedEnergyValue = valueOfThis
            chosenDroppedEn = goodDroppedEnergy[energ]
        }
    }

    if (BestDroppedEnergyValue > containerVal) {
        Memory.builderHarvestSpot = chosenDroppedEn.pos
        Memory.builderStructureType = "dropped"
    }
    else {
        Memory.builderHarvestSpot = closestContainer.pos
        Memory.builderStructureType = "container"
    }

}
