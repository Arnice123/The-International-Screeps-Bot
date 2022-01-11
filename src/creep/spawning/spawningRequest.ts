/* This code is to find out how many parts a creep should have for their select role */

export function SpawnInCreep(room: Room) {

    // Getting the amount of creeps in the room

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');

    // getting the energy structures

    const spawnStructuresSpawn: StructureSpawn = Game.spawns['Arnice123']
    const spawnStructuresExtention: StructureExtension[] = room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: StructureExtension }
    })

    // getting how much energy is available

    const spawnEnergyAvailable = room.energyAvailable

    // getting the capacity

    const spawnEnergyCapacity = room.energyCapacityAvailable

    // if the amount of creeps for each role is less than 2 spawn in a new one

    if (harvesters.length < 2) {
        SpawnInHarvester
    }

    if (upgraders.length < 2) {
        SpawnInUpgrader
    }

    if (builders.length < 2) {
        SpawnInBuilder
    }

    if (haulers.length < 2) {
        SpawnInHauler
    }

    // creating the maximum that the creep can cost

    const maxCost = spawnEnergyCapacity

    function SpawnInHarvester() {

        if (spawnEnergyAvailable <= 300) {
            var newName = 'Harvester(T1)' + Game.time;
            console.log('Spawning new harvester(T1): ' + newName);
            Game.spawns['Arnice123'].spawnCreep([WORK, WORK, MOVE], newName,
                { memory: { role: 'harvester' } });
        }

        if (spawnEnergyAvailable > 300 && spawnEnergyAvailable <= 400) {
            var newName = 'Harvester(T2)' + Game.time;
            console.log('Spawning new harvester(T2): ' + newName);
            Game.spawns['Arnice123'].spawnCreep([WORK, WORK, WORK, WORK, MOVE], newName,
                { memory: { role: 'harvester' } });

        }

        if (spawnEnergyAvailable > 400 && spawnEnergyAvailable <= 600) {
            var newName = 'Harvester(T3)' + Game.time;
            console.log('Spawning new harvester(T3): ' + newName);
            Game.spawns['Arnice123'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], newName,
                { memory: { role: 'harvester' } });

        }

    }

    function SpawnInUpgrader() {
        if (spawnEnergyAvailable <= 300) {
            var newName = 'Upgrader(T1)' + Game.time;
            console.log('Spawning new upgrader(T1): ' + newName);
            Game.spawns['Arnice123'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'upgrader' } });
        }

        if (spawnEnergyAvailable > 300 && spawnEnergyAvailable <= 400) {
            var newName = 'Upgrader(T2)' + Game.time;
            console.log('Spawning new upgrader(T2): ' + newName);
            Game.spawns['Arnice123'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName,
                { memory: { role: 'upgrader' } });

        }

        if (spawnEnergyAvailable > 400 && spawnEnergyAvailable <= 600) {
            var newName = 'Upgrader(T3)' + Game.time;
            console.log('Spawning new upgrader(T3): ' + newName);
            Game.spawns['Arnice123'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'upgrader' } });

        }
    }

    function SpawnInBuilder() {
        if (spawnEnergyAvailable <= 300) {
            var newName = 'Builder(T1)' + Game.time;
            console.log('Spawning new builder(T1): ' + newName);
            Game.spawns['Arnice123'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'builder' } });
        }

        if (spawnEnergyAvailable > 300 && spawnEnergyAvailable <= 400) {
            var newName = 'Builder(T2)' + Game.time;
            console.log('Spawning new builder(T2): ' + newName);
            Game.spawns['Arnice123'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName,
                { memory: { role: 'builder' } });

        }

        if (spawnEnergyAvailable > 400 && spawnEnergyAvailable <= 600) {
            var newName = 'Builder(T3)' + Game.time;
            console.log('Spawning new builder(T3): ' + newName);
            Game.spawns['Arnice123'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'builder' } });

        }
    }

    function SpawnInHauler() {
        if (spawnEnergyAvailable <= 300) {
            var newName = 'Hauler(T1)' + Game.time;
            console.log('Spawning new hauler(T1): ' + newName);
            Game.spawns['Arnice123'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'hauler' } });
        }

        if (spawnEnergyAvailable > 300 && spawnEnergyAvailable <= 400) {
            var newName = 'Hauler(T2)' + Game.time;
            console.log('Spawning new hauler(T2): ' + newName);
            Game.spawns['Arnice123'].spawnCreep([WORK, CARRY, CARRY, CARRY, MOVE], newName,
                { memory: { role: 'hauler' } });

        }

        if (spawnEnergyAvailable > 400 && spawnEnergyAvailable <= 600) {
            var newName = 'Hauler(T3)' + Game.time;
            console.log('Spawning new hauler(T3): ' + newName);
            Game.spawns['Arnice123'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'hauler' } });

        }
    }

}
