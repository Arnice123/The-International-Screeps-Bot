// These are global type declarations

import { SpawnInCreep } from "creep/spawning/spawningRequest"
import { FindEmptySites } from "room/constructionManager"

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

    }

    interface CreepMemory {
        role: string;
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

    //how often FindEmptySites runs

    const waitTime = 50

    // If the remainder of dividing the current game time by some value is 0, then its been some amount of ticks

    if (Game.time % waitTime == 0) {
        FindEmptySites
    }

    //how often it checks to spawn in another creep'

    const waitingTime = 5

    // If the remainder of dividing the current game time by some value is 0, then its been some amount of ticks

    if (Game.time % waitingTime == 0) {
        SpawnInCreep
    }

     // displaying what type of creep is spawning
     if(Game.spawns['Arnice123'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Arnice123'].spawning.name];
        Game.spawns['Arnice123'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Arnice123'].pos.x + 1,
            Game.spawns['Arnice123'].pos.y,
            {align: 'left', opacity: 0.8});
    }


    // This is the main loop
}
