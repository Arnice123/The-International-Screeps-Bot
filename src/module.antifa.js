let allyList = require("module.allyList")
let creepFunctions = require("module.creepFunctions")

module.exports = {
    run: function() {

        if (Memory.global.attackTarget) {

            let antifaAssaulters = _.filter(Game.creeps, (c) => c.memory.role == 'antifaAssaulter');
            let antifaSupporters = _.filter(Game.creeps, (c) => c.memory.role == 'antifaSupporter');

            for (let creep of antifaSupporters) {

                const inSquad = creep.memory.inSquad
                const assaulter = Game.creeps[creep.memory.assaulter]

                let creepIsEdge = (creep.pos.x <= 0 || creep.pos.x >= 48 || creep.pos.y <= 0 || creep.pos.y >= 48)

                if (creep.memory.assaulter && !assaulter) {

                    creep.memory.assaulter = undefined
                    creep.memory.inSquad = false
                }
                if (assaulter) {
                    if (inSquad) {

                        creep.say("IS")

                        if (creep.room == assaulter.room) {

                            if (creep.pos.isNearTo(assaulter)) {

                                let direction = creep.pos.getDirectionTo(assaulter)
                                creep.move(direction)

                            } else {

                                let goal = _.map([assaulter], function(target) {
                                    return { pos: target.pos, range: 1 }
                                })

                                creep.intraRoomPathing(creep.pos, goal)

                            }
                        } else {

                            let goal = _.map([assaulter], function(target) {
                                return { pos: target.pos, range: 1 }
                            })

                            creep.onlySafeRoomPathing(creep.pos, goal)
                        }
                    } else {

                        let goal = _.map([new RoomPosition(25, 25, creep.memory.roomFrom)], function(target) {
                            return { pos: target, range: 1 }
                        })

                        creep.onlySafeRoomPathing(creep.pos, goal)
                    }
                } else if (findCreepWithoutTask(creep, antifaAssaulters)) {

                    creep.memory.assaulter = findCreepWithoutTask(creep, antifaAssaulters).name
                    creep.memory.inSquad = true

                    findCreepWithoutTask(creep, antifaAssaulters).memory.supporter = creep.name
                    findCreepWithoutTask(creep, antifaAssaulters).memory.inSquad = true

                } else {

                    creep.say("NS")

                    let goal = _.map([new RoomPosition(25, 25, creep.memory.roomFrom)], function(target) {
                        return { pos: target, range: 1 }
                    })

                    creep.onlySafeRoomPathing(creep.pos, goal)
                }
            }

            function findCreepWithoutTask(creep, collection) {

                for (let assaulter of collection) {

                    if (assaulter.memory.roomFrom == creep.room.name) {

                        if (!assaulter.memory.inSquad) {

                            return assaulter
                        }
                    }
                }
                return false
            }
            for (let creep of antifaAssaulters) {

                const inSquad = creep.memory.inSquad
                const supporter = Game.creeps[creep.memory.supporter]

                let creepIsEdge = (creep.pos.x <= 0 || creep.pos.x >= 48 || creep.pos.y <= 0 || creep.pos.y >= 48)

                let target

                function squadHeal(creep) {

                    let closestInjured = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                        filter: (c) => {
                            return (allyList.run().indexOf(c.owner.username.toLowerCase()) >= 0)
                        }
                    })

                    if (closestInjured) {

                        target = "closestInjured"

                        creep.say("CI")

                        if (supporter.pos.getRangeTo(closestInjured) > 1) {

                            let goal = _.map([closestInjured], function(target) {
                                return { pos: target.pos, range: 1 }
                            })

                            supporter.rangedHeal(closestInjured)
                        } else {

                            supporter.heal(closestInjured)
                        }
                    }
                }

                function squadHostile(creep) {

                    let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                        filter: (c) => {
                            return (allyList.run().indexOf(c.owner.username.toLowerCase()) === -1)
                        }
                    })

                    if (closestHostile && !(closestHostile.pos.x <= 0 || closestHostile.pos.x >= 48 || closestHostile.pos.y <= 0 || closestHostile.pos.y >= 48)) {

                        target = "closestHostile"

                        creep.say("H")

                        if (creep.pos.getRangeTo(closestHostile) > 3) {

                            let goal = _.map([closestHostile], function(target) {
                                return { pos: target.pos, range: 1 }
                            })

                            creep.intraRoomPathing(creep.pos, goal)

                        } else {

                            if (creep.pos.getRangeTo(closestHostile) == 1) {

                                creep.rangedMassAttack()

                            } else if (creep.pos.getRangeTo(closestHostile) <= 3) {

                                creep.rangedAttack(closestHostile)
                            }
                        }
                        if (creep.pos.getRangeTo(closestHostile) <= 2) {

                            let direction = creep.pos.getDirectionTo(supporter)
                            creep.move(direction)

                            let goal = _.map([closestHostile], function(target) {
                                return { pos: target.pos, range: 3 }
                            })

                            supporter.creepFlee(supporter.pos, goal)
                        }
                    }
                }

                if (creep.memory.supporter && !supporter) {

                    creep.memory.supporter = undefined
                    creep.memory.inSquad = false
                }
                if (supporter) {

                    if (creep.room.name == creep.memory.roomFrom) {

                        if (inSquad) {

                            creep.say("IS")

                            if (creep.pos.isNearTo(supporter) || creepIsEdge) {

                                creep.say("N")

                                let closestInjured = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                                    filter: (c) => {
                                        return (allyList.run().indexOf(c.owner.username.toLowerCase()) >= 0)
                                    }
                                })

                                if (closestInjured) {

                                    target = "closestInjured"

                                    creep.say("CI")

                                    if (supporter.pos.getRangeTo(closestInjured) > 1) {

                                        let goal = _.map([closestInjured], function(target) {
                                            return { pos: target.pos, range: 1 }
                                        })

                                        supporter.rangedHeal(closestInjured)
                                    } else {

                                        supporter.heal(closestInjured)
                                    }
                                }

                                let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                                    filter: (c) => {
                                        return (allyList.run().indexOf(c.owner.username.toLowerCase()) === -1)
                                    }
                                })

                                if (closestHostile && !(closestHostile.pos.x <= 0 || closestHostile.pos.x >= 48 || closestHostile.pos.y <= 0 || closestHostile.pos.y >= 48)) {

                                    target = "closestHostile"

                                    creep.say("H")

                                    if (creep.pos.getRangeTo(closestHostile) > 3) {

                                        let goal = _.map([closestHostile], function(target) {
                                            return { pos: target.pos, range: 1 }
                                        })

                                        creep.intraRoomPathing(creep.pos, goal)

                                    } else {

                                        if (creep.pos.getRangeTo(closestHostile) == 1) {

                                            creep.rangedMassAttack()

                                        } else if (creep.pos.getRangeTo(closestHostile) <= 3) {

                                            creep.rangedAttack(closestHostile)
                                        }
                                    }
                                    if (creep.pos.getRangeTo(closestHostile) <= 2) {

                                        let direction = creep.pos.getDirectionTo(supporter)
                                        creep.move(direction)

                                        let goal = _.map([closestHostile], function(target) {
                                            return { pos: target.pos, range: 4 }
                                        })

                                        supporter.creepFlee(supporter.pos, goal)
                                    }
                                } else {

                                    let goal = _.map([new RoomPosition(25, 25, Memory.global.attackTarget)], function(pos) {
                                        return { pos: pos, range: 2 }
                                    })

                                    if (creep.fatigue == 0 && supporter.fatigue == 0) {

                                        creep.onlySafeRoomPathing(creep.pos, goal)
                                    }
                                }
                            } else {

                                creep.say("F")

                                if (creep.room.name == Memory.global.attackTarget) {

                                    let goal = _.map([new RoomPosition(25, 25, creep.memory.roomFrom)], function(pos) {
                                        return { pos: pos, range: 2 }
                                    })

                                    creep.intraRoomPathing(creep.pos, goal)

                                } else {

                                    creep.say("W")
                                }
                            }
                        } else {

                            let ramparts = creep.room.find(FIND_MY_STRUCTURES, {
                                filter: s => s.structureType == STRUCTURE_RAMPART
                            })

                            if (ramparts.length > 0) {

                                let outerRampart

                                let cm = PathFinder.CostMatrix.deserialize(creep.room.memory.defaultCostMatrix)

                                for (let rampart of ramparts) {

                                    if (cm && cm.get(rampart.x, rampart.y) < 255) {

                                        outerRampart = rampart
                                        break
                                    }
                                }

                                if (outerRampart) {

                                    let goal = _.map([outerRampart], function(target) {
                                        return { pos: target.pos, range: 0 }
                                    })

                                    if (creep.fatigue == 0 && supporter.fatigue == 0) {

                                        creep.intraRoomPathing(creep.pos, goal)
                                    }
                                }
                            }
                        }
                    } else if (creep.room.name == Memory.global.attackTarget) {

                        if (inSquad) {

                            creep.say("IS")

                            if (creep.pos.isNearTo(supporter) || creepIsEdge) {

                                creep.say("N")

                                let closestInjured = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                                    filter: (c) => {
                                        return (allyList.run().indexOf(c.owner.username.toLowerCase()) >= 0)
                                    }
                                })

                                if (closestInjured) {

                                    target = "closestInjured"

                                    creep.say("CI")

                                    if (supporter.pos.getRangeTo(closestInjured) > 1) {

                                        let goal = _.map([closestInjured], function(target) {
                                            return { pos: target.pos, range: 1 }
                                        })

                                        supporter.rangedHeal(closestInjured)
                                    } else {

                                        supporter.heal(closestInjured)
                                    }
                                } else {

                                    supporter.heal(creep)
                                }

                                let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                                    filter: (c) => {
                                        return (allyList.run().indexOf(c.owner.username.toLowerCase()) === -1)
                                    }
                                })

                                if (closestHostile && !(closestHostile.pos.x <= 0 || closestHostile.pos.x >= 48 || closestHostile.pos.y <= 0 || closestHostile.pos.y >= 48)) {

                                    target = "closestHostile"

                                    creep.say("H")

                                    if (creep.pos.getRangeTo(closestHostile) > 3) {

                                        let goal = _.map([closestHostile], function(target) {
                                            return { pos: target.pos, range: 1 }
                                        })

                                        creep.intraRoomPathing(creep.pos, goal)

                                    } else {

                                        if (creep.pos.getRangeTo(closestHostile) == 1) {

                                            creep.rangedMassAttack()

                                        } else if (creep.pos.getRangeTo(closestHostile) <= 3) {

                                            creep.rangedAttack(closestHostile)
                                        }
                                    }
                                    if (creep.pos.getRangeTo(closestHostile) <= 2) {

                                        let direction = creep.pos.getDirectionTo(supporter)
                                        creep.move(direction)

                                        let goal = _.map([closestHostile], function(target) {
                                            return { pos: target.pos, range: 4 }
                                        })

                                        supporter.creepFlee(supporter.pos, goal)
                                    }
                                } else {

                                    let goal = _.map([creep.room.controller], function(target) {
                                        return { pos: target.pos, range: 2 }
                                    })

                                    if (creep.fatigue == 0 && supporter.fatigue == 0) {

                                        creep.onlySafeRoomPathing(creep.pos, goal)
                                    }
                                }

                            } else {

                                creep.say("RF")

                                if (supporter.room != creep.room) {

                                    let goal = _.map([new RoomPosition(25, 25, creep.memory.roomFrom)], function(pos) {
                                        return { pos: pos, range: 2 }
                                    })

                                    creep.onlySafeRoomPathing(creep.pos, goal)
                                }
                            }
                        }
                    } else {

                        if (inSquad) {

                            creep.say("IS")

                            if (creep.pos.isNearTo(supporter) || creepIsEdge) {

                                creep.say("N")

                                let closestInjured = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                                    filter: (c) => {
                                        return (allyList.run().indexOf(c.owner.username.toLowerCase()) >= 0)
                                    }
                                })

                                if (closestInjured) {

                                    target = "closestInjured"

                                    creep.say("CI")

                                    if (supporter.pos.getRangeTo(closestInjured) > 1) {

                                        let goal = _.map([closestInjured], function(target) {
                                            return { pos: target.pos, range: 1 }
                                        })

                                        supporter.rangedHeal(closestInjured)
                                    } else {

                                        supporter.heal(closestInjured)
                                    }
                                }

                                let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                                    filter: (c) => {
                                        return (allyList.run().indexOf(c.owner.username.toLowerCase()) === -1)
                                    }
                                })

                                if (1 == 2 && closestHostile && !(closestHostile.pos.x <= 0 || closestHostile.pos.x >= 48 || closestHostile.pos.y <= 0 || closestHostile.pos.y >= 48)) {

                                    target = "closestHostile"

                                    creep.say("H")

                                    if (creep.pos.getRangeTo(closestHostile) > 3) {

                                        let goal = _.map([closestHostile], function(target) {
                                            return { pos: target.pos, range: 1 }
                                        })

                                        creep.intraRoomPathing(creep.pos, goal)

                                    } else {

                                        if (creep.pos.getRangeTo(closestHostile) == 1) {

                                            creep.rangedMassAttack()

                                        } else if (creep.pos.getRangeTo(closestHostile) <= 3) {

                                            creep.rangedAttack(closestHostile)
                                        }
                                    }
                                    if (creep.pos.getRangeTo(closestHostile) <= 2) {

                                        let direction = creep.pos.getDirectionTo(supporter)
                                        creep.move(direction)

                                        let goal = _.map([closestHostile], function(target) {
                                            return { pos: target.pos, range: 4 }
                                        })

                                        supporter.creepFlee(supporter.pos, goal)
                                    }
                                } else {

                                    let goal = _.map([new RoomPosition(25, 25, Memory.global.attackTarget)], function(pos) {
                                        return { pos: pos, range: 2 }
                                    })

                                    if (creep.fatigue == 0 && supporter.fatigue == 0) {

                                        creep.onlySafeRoomPathing(creep.pos, goal)
                                    }
                                }

                            } else {

                                creep.say("F")

                                if (creepIsEdge) {

                                    let goal = _.map([new RoomPosition(25, 25, creep.room.name)], function(target) {
                                        return { pos: target, range: 1 }
                                    })

                                    creep.onlySafeRoomPathing(creep.pos, goal)
                                }
                            }
                        } else {

                            creep.say("NS")

                            if (creepIsEdge) {

                                let goal = _.map([new RoomPosition(25, 25, creep.room.name)], function(target) {
                                    return { pos: target, range: 1 }
                                })

                                creep.onlySafeRoomPathing(creep.pos, goal)

                            } else {

                                let goal = _.map([new RoomPosition(25, 25, creep.memory.roomFrom)], function(target) {
                                    return { pos: target, range: 1 }
                                })

                                creep.onlySafeRoomPathing(creep.pos, goal)
                            }
                        }
                    }
                } else {

                    if (creepIsEdge) {

                        let goal = _.map([new RoomPosition(25, 25, creep.room.name)], function(target) {
                            return { pos: target, range: 1 }
                        })

                        creep.onlySafeRoomPathing(creep.pos, goal)

                    } else {

                        let goal = _.map([new RoomPosition(25, 25, creep.memory.roomFrom)], function(target) {
                            return { pos: target, range: 1 }
                        })

                        creep.onlySafeRoomPathing(creep.pos, goal)
                    }
                }
            }
        }
    }
}


/*

let allyList = require("module.allyList")
let creepFunctions = require("module.creepFunctions")

module.exports = {
    run: function(creep) {
        if (creep.memory.role == "antifaSupporter" || creep.memory.role == "antifaAssaulter") {

            var antifaRally = true

        }
        if (antifaRally == true) {

            let antifaAssaulter = _.filter(Game.creeps, (c) => c.memory.role == 'antifaAssaulter');
            let antifaSupporter = _.filter(Game.creeps, (c) => c.memory.role == 'antifaSupporter');

            for (let i = 0; i < antifaSupporter.length; i++) {

                let leader = antifaAssaulter[i]
                let member = antifaSupporter[i]

                if (leader && member) {

                    let leaderIsEdge = (leader.pos.x <= 0 || leader.pos.x >= 48 || leader.pos.y <= 0 || leader.pos.y >= 48)
                    let memberIsEdge = (member.pos.x <= 0 || member.pos.x >= 49 || member.pos.y <= 0 || member.pos.y >= 49)

                    const target = leader.memory.target = Memory.global.attackTarget

                    if (leader.room.name == leader.memory.roomFrom && leader.pos.getRangeTo(leader.pos.findClosestByRange(FIND_MY_SPAWNS)) < 8) {

                        if (leader.room.name == leader.memory.roomFrom) {

                            let goal = _.map([leader.pos.findClosestByRange(FIND_MY_SPAWNS)], function(target) {
                                return { pos: target.pos, range: 8 }
                            })

                            leader.creepFlee(leader.pos, goal)
                        }
                    } else if (leader.pos.isNearTo(member) || leaderIsEdge || memberIsEdge) {

                        member.say("F")

                        member.moveTo(leader)

                        let squadTarget

                        if (leader.room.name == target) {

                            let injuredCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                                filter: (c) => {
                                    return (allyList.run().indexOf(c.owner.username.toLowerCase()) >= 0)
                                }
                            })

                            if (injuredCreep && creep.moveTo(injuredCreep) != ERR_NO_PATH) {

                                member.say("IC")

                                if (creep.pos.inRangeTo(injuredCreep, 1)) {

                                    creep.heal(injuredCreep)
                                } else if (creep.pos.inRangeTo(injuredCreep, 3)) {

                                    creep.rangedHeal(injuredCreep)
                                }
                            } else {

                                member.heal(leader)
                            }

                            let hostile = leader.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                                filter: (c) => {
                                    return (allyList.run().indexOf(c.owner.username.toLowerCase()) === -1)
                                }
                            })

                            let hostileIsEdge = (hostile.pos.x <= 0 || hostile.pos.x >= 48 || hostile.pos.y <= 0 || hostile.pos.y >= 48)

                            if (hostile && !hostileIsEdge) {

                                leader.say("H")

                                if (leader.pos.inRangeTo(hostile, 3)) {

                                    leader.rangedAttack(hostile)
                                } else if (leader.pos.inRangeTo(hostile, 2)) {

                                    leader.rangedAttack(hostile)

                                    let goal = _.map([hostile], function(target) {
                                        return { pos: target.pos, range: 3 }
                                    })

                                    leader.creepFlee(leader.pos, goal)

                                } else if (leader.pos.inRangeTo(hostile, 1)) {

                                    leader.rangedMassAttack(hostile)

                                    let goal = _.map([hostile], function(target) {
                                        return { pos: target.pos, range: 3 }
                                    })

                                    leader.creepFlee(leader.pos, goal)
                                } else {

                                    let goal = _.map([hostile], function(target) {
                                        return { pos: target.pos, range: 1 }
                                    })

                                    leader.intraRoomPathing(leader.pos, goal)
                                }


                            } else {

                                let enemySpawn = leader.pos.findClosestByRange(FIND_HOSTILE_SPAWNS, {
                                    filter: (c) => c.owner.username !== "cplive" && c.owner.username !== "Brun1L" && c.owner.username !== "mrmartinstreet" && c.owner.username !== "Source Keeper"
                                })

                                if (enemySpawn && leader.moveTo(enemySpawn) != ERR_NO_PATH) {

                                    leader.say("Enemy Spawn")

                                    if (leader.pos.inRangeTo(enemySpawn, 2)) {

                                        leader.rangedAttack(enemySpawn)
                                    } else {

                                        leader.rangedAttack(enemySpawn)
                                    }

                                    if (leader.pos.inRangeTo(enemySpawn, 1)) {

                                        leader.rangedMassAttack(enemySpawn)
                                    } else {

                                        leader.rangedAttack(enemySpawn)
                                        leader.moveTo(enemySpawn, { visualizePathStyle: { stroke: '#ffffff' } })
                                    }
                                } else {

                                    let enemyStructure = leader.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                                        filter: (c) => c.owner.username !== "cplive" && c.owner.username !== "Brun1L" && c.owner.username !== "mrmartinstreet" && c.owner.username !== "Source Keeper" && c.structureType != STRUCTURE_CONTROLLER
                                    })

                                    if (enemyStructure && leader.moveTo(enemySpawn) != ERR_NO_PATH) {

                                        leader.say("Enemy Structure")

                                        if (leader.pos.inRangeTo(enemyStructure, 2)) {

                                            leader.rangedAttack(enemyStructure)
                                        } else {

                                            leader.rangedAttack(enemyStructure)
                                        }

                                        if (leader.pos.inRangeTo(enemyStructure, 1)) {

                                            leader.rangedMassAttack(enemyStructure)
                                        } else {

                                            leader.rangedAttack(enemyStructure)
                                            leader.moveTo(enemyStructure, { visualizePathStyle: { stroke: '#ffffff' } })
                                        }
                                    } else {

                                        let enemyBarricade = leader.pos.findClosestByPath(FIND_STRUCTURES, {
                                            filter: s => s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART
                                        })

                                        if (enemyBarricade) {

                                            let mainTarget = Game.getObjectById(leader.room.memory.mainTarget)

                                            leader.say("MT: " + mainTarget.pos.x + ", " + mainTarget.pos.y)

                                            if (!mainTarget) {

                                                leader.room.memory.mainTarget = enemyBarricade.id
                                            } else {

                                                leader.room.visual.circle(mainTarget.pos, {
                                                    fill: 'transparent',
                                                    radius: 0.8,
                                                    stroke: '#39A0ED',
                                                    strokeWidth: 0.125
                                                });

                                                if (leader.pos.inRangeTo(mainTarget, 2)) {

                                                    creep.rangedAttack(mainTarget)
                                                } else {

                                                    creep.rangedAttack(mainTarget)
                                                    leader.moveTo(mainTarget)
                                                }
                                            }
                                        } else {

                                            if (creep.room.controller) {

                                                let goal = _.map([leader.room.controller], function(target) {
                                                    return { pos: target.pos, range: 3 }
                                                })

                                                //leader.intraRoomPathing(leader.pos, goal)
                                            }
                                        }
                                    }
                                }
                            }
                        } else {

                            leader.say("AT")

                            goal = _.map([new RoomPosition(25, 25, target)], function(pos) {
                                return { pos: pos, range: 3 }
                            })

                            leader.onlySafeRoomPathing(leader.pos, goal)
                        }
                    } else {

                        leader.say("No M")

                        member.say("No L")

                        goal = _.map([leader], function(target) {
                            return { pos: target.pos, range: 1 }
                        })

                        member.onlySafeRoomPathing(member.pos, goal)

                    }
                }
            }
        }
    }
};
*/