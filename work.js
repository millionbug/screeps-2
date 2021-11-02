"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.harverstWork = exports.harverst = exports.repairWork = exports.repair = exports.buildWork = exports.build = exports.upGraderWork = exports.upGrader = exports.work = void 0;
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
        const target = source_1.room.find(FIND_STRUCTURES).filter(stru => stru.id === repairTask.targetId)[0];
        const result = repairer.repair(target);
        repairer.say(result.toString());
        if (result == ERR_NOT_IN_RANGE) {
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
function harverst(harverster, harverstTask) {
    const source = source_1.room.find(FIND_SOURCES).find(sou => sou.id === harverstTask.targetId);
    const container = source_1.room.lookAt(harverster.pos).find(item => { var _a; return ((_a = item.structure) === null || _a === void 0 ? void 0 : _a.structureType) === STRUCTURE_CONTAINER; });
    if (container) {
        harverster.harvest(source);
    }
    else {
        const { x, y } = source.pos;
        // 找到最近的一个 container
        const container = source_1.room.lookForAtArea(LOOK_STRUCTURES, x - 1, y - 1, x + 1, y + 1, true).find(item => item.structure.structureType === STRUCTURE_CONTAINER);
        harverster.moveTo(container.structure);
    }
}
exports.harverst = harverst;
function harverstWork(creep, harverstTask) {
    harverstTask.currentWorker = creep;
    harverst(creep, harverstTask);
}
exports.harverstWork = harverstWork;
