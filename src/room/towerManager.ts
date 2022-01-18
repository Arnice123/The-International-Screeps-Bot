/*
This code will manage what the tower does
*/

const allyList: string[] = ['MarvinTMB', 'Bango88']

export function TowerStuff(room: Room, tower: StructureTower) {

    var hostiles = room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        if (username != allyList[0] || username != allyList[1]) {
            Game.notify(`User ${username} spotted in room ${room}, the name of the enemy creep is ${hostiles[0].name}`);
            tower.attack(hostiles[0]);
        }

    }


}
