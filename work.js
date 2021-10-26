"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repairWork = exports.repair = exports.buildWork = exports.build = exports.upGraderWork = exports.upGrader = exports.work = void 0;
const task_1 = require("./task");
function work(creep, workFn) {
    const sources = creep.room.find(FIND_SOURCES);
    creep.say(creep.store.energy.toString());
    creep.say(creep.memory.workStatus);
    if (creep.store.energy == 0 && creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
        creep.memory.workStatus = task_1.WorkingStatus.harvesting;
    }
    else if (creep.memory.workStatus === task_1.WorkingStatus.harvesting && creep.store.energy < creep.store.getCapacity()) {
        const result = creep.harvest(sources[0]);
        creep.say(result.toString());
    }
    else {
        workFn();
    }
}
exports.work = work;
function upGrader(upGrader) {
    return () => {
        const target = upGrader.room.controller;
        const result = upGrader.upgradeController(target);
        upGrader.say('upgarder' + result.toString());
        if (result == ERR_NOT_IN_RANGE) {
            upGrader.moveTo(target);
        }
        else if (upGrader.memory.workStatus === task_1.WorkingStatus.upgradeing) {
            if (upGrader.upgradeController(target) === ERR_NOT_ENOUGH_ENERGY) {
                upGrader.memory.workStatus = task_1.WorkingStatus.harvesting;
            }
            ;
        }
        else {
            upGrader.upgradeController(target);
            upGrader.memory.workStatus = task_1.WorkingStatus.upgradeing;
        }
    };
}
exports.upGrader = upGrader;
function upGraderWork(creep) {
    work(creep, upGrader(creep));
}
exports.upGraderWork = upGraderWork;
function build(builder, buildTask) {
    return () => {
        const target = Game.constructionSites[buildTask.targetId];
        const result = builder.build(target);
        builder.say('building' + result);
        if (result == ERR_NOT_IN_RANGE) {
            builder.moveTo(target);
        }
        else if (builder.memory.workStatus === task_1.WorkingStatus.building && result === ERR_NOT_ENOUGH_ENERGY) {
            builder.memory.workStatus = task_1.WorkingStatus.harvesting;
        }
        else {
            builder.build(target);
            builder.memory.workStatus = task_1.WorkingStatus.building;
        }
    };
}
exports.build = build;
function buildWork(builder, buildTask) {
    work(builder, build(builder, buildTask));
}
exports.buildWork = buildWork;
function repair(repairer, repairTask) {
    return () => {
        const target = Game.structures[repairTask.targetId];
        if (repairer.repair(target) == ERR_NOT_IN_RANGE) {
            repairer.moveTo(target);
        }
        else if (repairer.memory.workStatus === task_1.WorkingStatus.repairing) {
            if (repairer.repair(target) === ERR_NOT_ENOUGH_ENERGY) {
                repairer.memory.workStatus = task_1.WorkingStatus.harvesting;
            }
            ;
        }
        else {
            repairer.repair(target);
            repairer.memory.workStatus = task_1.WorkingStatus.repairing;
        }
    };
}
exports.repair = repair;
function repairWork(repairer, repairTask) {
    work(repairer, repair(repairer, repairTask));
}
exports.repairWork = repairWork;
