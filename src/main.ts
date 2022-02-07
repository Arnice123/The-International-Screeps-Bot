// These are global type declarations

import { roleBuilder } from "room/creep/builder"
import { ManageTheBuilder } from "room/creep/creepManagers/builderManager"
import { roleHarvester } from "room/creep/harvester"
import { roleHauler } from "room/creep/hauler"
import { roleRepairer } from "room/creep/repairer"
import { SpawnInCreep } from "room/creep/spawning/spawningRequest"
import { roleUpgrader } from "room/creep/upgrader"
import { filter } from "lodash"
import { FindEmptySites } from "room/buildings/construction/RoadManager"
import { PlaceContainersByController } from "room/buildings/construction/spawnContainerManager"
import { CheckIfContainerIsNeeded } from "room/buildings/ContainerManager"
import { TowerStuff } from "room/buildings/towerManager"

declare global {
    /*
      Example types, expand on these or remove them and add your own.
      Note: Values, properties defined here do no fully *exist* by this type definiton alone.
            You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)
      Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
      Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
    */
    // Memory extension samples
    interface Memory {
        chosenBuildEnergy: Id<Resource<ResourceConstant>>
        chosenBuildContainer: Id<StructureContainer>


    }

    interface RoomMemory {
        chosenBuildID: Id<ConstructionSite>
        spawnContainerID: Id<StructureContainer>

        path1: PathStep[]
        path2: PathStep[]

        spawnContainerPosition: RoomPosition
    }

    interface CreepMemory {
        role: string
        building?: boolean
        hauling?: boolean
        repairing?: boolean
        upgrading?: boolean
        harvesting?: boolean
    }

    // Syntax for adding proprties to `global` (ex "global.log")
    namespace NodeJS {
        interface Global {

        }
    }
}

export const loop = function () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name]
            console.log('Clearing non-existing creep memory:', name)
        }
    }

    //getting the room
    const myHardcodedRoomName = "E29N11";
    const room = Game.rooms[myHardcodedRoomName]

    //getting the spawn
    const spawn: StructureSpawn = Game.spawns['Arnice123']

    //getting the controller
    const controller = room.controller

    //getting the tower
    let towers: StructureTower[] = room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER);
        }
    });

    for (var tower in towers) {
        TowerStuff(room, towers[tower])
    }


    //how often FindEmptySites runs

    const waitTime = 50

    // If the remainder of dividing the current game time by some value is 0, then its been some amount of ticks

    if (Game.time % waitTime == 0) {
        FindEmptySites(room, spawn)
    }

    const wt = 15

    if (Game.time % wt == 0) {
        if (CheckIfContainerIsNeeded(room)) {
            PlaceContainersByController(controller, room, spawn)
        }
    }

    //how often it checks to spawn in another creep'

    const waitingTime = 5

    // If the remainder of dividing the current game time by some value is 0, then its been some amount of ticks

    if (Game.time % waitingTime == 0) {
        SpawnInCreep
    }

    // displaying what type of creep is spawning
    if (Game.spawns['Arnice123'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Arnice123'].spawning.name];
        Game.spawns['Arnice123'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Arnice123'].pos.x + 1,
            Game.spawns['Arnice123'].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

    // This is the main loop
}
