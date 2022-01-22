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
                    creep.moveTo(energyToHarvest);
                }
            }

        }
    }
}




