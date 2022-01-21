/* this code manages the builder */

export function ManageTheBuilder(creep: Creep, room: Room) {


    function findEnergy() {
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

        var containers: StructureContainer[] = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                i.store[RESOURCE_ENERGY] > 0
        })

        const closestContainer = creep.pos.findClosestByRange(containers)

        FindChosenSpot(goodDroppedEnergy, closestContainer, creep)

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



    }
}
