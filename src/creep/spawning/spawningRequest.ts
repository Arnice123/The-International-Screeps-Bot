/* This code is to find out how many parts a creep should have for their select role */

import internal from "stream"

export function SpawnInCreep(room: Room, spawn: StructureSpawn) {

    // Getting the amount of creeps in the room

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer')
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder')
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler')


    // getting the energy structures

    const spawnStructuresExtention: StructureExtension[] = room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: StructureExtension }
    })

    // getting how much energy is available

    const spawnEnergyAvailable = room.energyAvailable

    // creating a creep body that has default parts, extra parts and a maximun amount of parts

    interface BodyOpts {
        defaultParts: BodyPartConstant[]
        extraParts: BodyPartConstant[]
        maxParts: number
    }

    // if the amount of creeps for each role is less than 2 spawn in a new one

    if (harvesters.length < 2) {
        SpawnInHarvester(spawnEnergyAvailable)
    }

    if (upgraders.length < 2) {
        SpawnInUpgrader(spawnEnergyAvailable)
    }

    if (builders.length < 2) {
        SpawnInBuilder(spawnEnergyAvailable)
    }

    if (haulers.length < 2) {
        SpawnInHauler(spawnEnergyAvailable)
    }

    if (repairers.length < 2) {
        SpawnInRepairer(spawnEnergyAvailable)
    }

    // function to spawn in harvesters

    function SpawnInHarvester(energy: number) {

        // if there isn't enough energy to spawn it in return

        if (energy < 300) {
            return
        }

        // get the amount of parts that it can create

        var numberOfParts = Math.floor((energy - 300) / 50)

        // creating the body

        let body: BodyPartConstant[] = [MOVE, WORK, WORK]

        // adding a work part for each part there is

        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }

        // spawning in the creep
        var newName = 'Harvester(T' + numberOfParts + ')' + Game.time
        spawn.spawnCreep(body, newName, { memory: { role: 'harvester' } })
    }

    function SpawnInUpgrader(energy: number) {

        if (energy < 300) {
            return
        }

        // creating the body

        let body: BodyOpts = {
            defaultParts: [MOVE, CARRY, WORK],
            extraParts: [],
            maxParts: 30
        }

        var numberOfParts = Math.floor((energy - 300) / 50);

        // dividing the amount of parts amoung them

        // carry gets a third
        var numberOfCarryParts = Math.floor(numberOfParts * 0.20)

        // move gets half of the work parts
        var numberOfMoveParts = Math.floor(numberOfParts * 0.1)

        // work gets double the amount of move parts for max speed
        var numberOfWorkParts = Math.floor(numberOfParts * 0.7)


        for (let i = 0; i < numberOfWorkParts; i++) {
            body.extraParts.push(WORK)
        }

        for (let i = 0; i < numberOfMoveParts; i++) {
            body.extraParts.push(MOVE)
        }

        for (let i = 0; i < numberOfCarryParts; i++) {
            body.extraParts.push(CARRY)
        }

        // creating a new body
        var newBody: BodyPartConstant[] = []

        for (var i in body.defaultParts) {
            newBody.push(body.defaultParts[i])
        }

        for (var i in body.extraParts) {
            newBody.push(body.extraParts[i])
        }

        //spawing in Upgrader
        var newName = 'Upgrader(T' + numberOfParts + ')' + Game.time
        spawn.spawnCreep(newBody, newName, { memory: { role: 'upgrader' } })
        return
    }

    function SpawnInBuilder(energy: number) {
        if (energy < 300) {
            return
        }

        let body: BodyOpts = {
            defaultParts: [MOVE, CARRY, WORK],
            extraParts: [],
            maxParts: 30
        }

        // create a balanced body as big as possible with the given energy
        var numberOfParts = Math.floor((energy - 300) / 50);

        var numberOfCarryParts = Math.floor(numberOfParts * 0.35)
        var numberOfMoveParts = Math.floor(numberOfParts * 0.22)
        var numberOfWorkParts = Math.floor(numberOfParts * 0.43)


        for (let i = 0; i < numberOfWorkParts; i++) {
            body.extraParts.push(WORK)
        }

        for (let i = 0; i < numberOfMoveParts; i++) {
            body.extraParts.push(MOVE)
        }

        for (let i = 0; i < numberOfCarryParts; i++) {
            body.extraParts.push(CARRY)
        }

        //creating new bodt with defauly parts
        var newBody: BodyPartConstant[] = [MOVE, CARRY, WORK]

        //adding the extra parts
        for (var i in body.extraParts) {
            newBody.push(body.extraParts[i])
        }

        //spawing in a builder
        var newName = 'Builder(T' + numberOfParts + ')' + Game.time
        spawn.spawnCreep(newBody, newName, { memory: { role: 'builder' } })
        return
    }

    function SpawnInHauler(energy: number) {
        if (energy < 300) {
            return
        }

        // create a balanced body as big as possible with the given energy

        var numberOfParts = Math.floor((energy - 300) / 50)

        let body: BodyPartConstant[] = [MOVE, CARRY, CARRY]

        for (let i = 0; i < numberOfParts - 1; i++) {
            body.push(CARRY);
        }

        var newName = 'Hauler(T' + numberOfParts + ')' + Game.time
        spawn.spawnCreep(body, newName, { memory: { role: 'hauler' } })
    }

    function SpawnInRepairer(energy: number) {

        if (energy < 300) {
            return
        }

        let body: BodyOpts = {
            defaultParts: [MOVE, CARRY, WORK],
            extraParts: [],
            maxParts: 30
        }

        // create a balanced body as big as possible with the given energy
        var numberOfParts = Math.floor((energy - 300) / 50);

        var numberOfCarryParts = Math.floor(numberOfParts * 0.35)
        var numberOfMoveParts = Math.floor(numberOfParts * 0.22)
        var numberOfWorkParts = Math.floor(numberOfParts * 0.43)


        for (let i = 0; i < numberOfWorkParts; i++) {
            body.extraParts.push(WORK)
        }

        for (let i = 0; i < numberOfMoveParts; i++) {
            body.extraParts.push(MOVE)
        }

        for (let i = 0; i < numberOfCarryParts; i++) {
            body.extraParts.push(CARRY)
        }

        //creating new bodt with defauly parts
        var newBody: BodyPartConstant[] = [MOVE, CARRY, WORK]

        //adding the extra parts
        for (var i in body.extraParts) {
            newBody.push(body.extraParts[i])
        }

        //spawing in a builder
        var newName = 'Repairer(T' + numberOfParts + ')' + Game.time
        spawn.spawnCreep(newBody, newName, { memory: { role: 'repairer' } })
        return
    }

}
