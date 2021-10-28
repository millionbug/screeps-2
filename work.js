"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.harverstWork = exports.repairWork = exports.repair = exports.buildWork = exports.build = exports.upGraderWork = exports.upGrader = exports.work = void 0;
const task_1 = require("./task");
const source_1 = require("./source");
function work(creep, workFn) {
    const source = source_1.default.findSourceAble(creep);
    source_1.default.markCreep(creep, source.id);
    creep.say(creep.store.energy.toString());
    creep.say(creep.memory.workStatus);
    if (creep.store.energy == 0 && creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
        creep.memory.workStatus = task_1.WorkingStatus.harvesting;
    }
    else if (creep.memory.workStatus === task_1.WorkingStatus.harvesting && creep.store.energy < creep.store.getCapacity()) {
        const result = creep.harvest(source);
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
        const target = Object.values(Game.rooms)[0].find(FIND_STRUCTURES).filter(stru => stru.id === repairTask.targetId)[0];
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
function harverstWork(creep) {
}
exports.harverstWork = harverstWork;
