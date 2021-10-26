"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goToWork = exports.work = void 0;
const creepsList_1 = require("./creepsList");
const task_1 = require("./task");
function work(creep, workFn) {
    if (creep.store[RESOURCE_ENERGY] == 0) {
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
    else {
        workFn();
    }
}
exports.work = work;
function goToWork() {
    const { repairers, builders, upGraders } = creepsList_1.default;
    const repairTask = task_1.default.list.find(task => task.action === task_1.TaskAction.repair);
    if (repairTask) {
        const workFn = (repairer) => {
            return () => {
                const target = Game.structures[repairTask.targetId];
                if (repairer.repair(target) == ERR_NOT_IN_RANGE) {
                    repairer.moveTo(target);
                }
            };
        };
        repairers.forEach(repairer => {
            work(repairer, workFn(repairer));
        });
    }
    const buildTask = task_1.default.list.find(task => task.action === task_1.TaskAction.repair);
    if (buildTask) {
        const workFn = (builder) => {
            return () => {
                const target = Game.constructionSites[repairTask.targetId];
                if (builder.build(target) == ERR_NOT_IN_RANGE) {
                    builder.moveTo(target);
                }
            };
        };
        builders.forEach(builder => {
            work(builder, workFn(builder));
        });
    }
    const upGradeTask = task_1.default.list.find(task => task.action === task_1.TaskAction.repair);
    if (upGradeTask) {
        const workFn = (upGrader) => {
            return () => {
                const target = upGrader.room.controller;
                if (upGrader.upgradeController(target) == ERR_NOT_IN_RANGE) {
                    upGrader.moveTo(target);
                }
            };
        };
        upGraders.forEach(upGrader => {
            work(upGrader, workFn(upGrader));
        });
    }
}
exports.goToWork = goToWork;
