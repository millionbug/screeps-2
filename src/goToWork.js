"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goToWork = void 0;
const creepsList_1 = require("./creepsList");
const task_1 = require("./task");
function goToWork() {
    const { repairers, builders, upGraders } = creepsList_1.default;
    const repairTask = task_1.default.list.find(task => task.action === task_1.TaskAction.repair);
    if (repairTask) {
        repairers.forEach(repairer => {
            if (repairer.store[RESOURCE_ENERGY] == 0) {
                const sources = repairer.room.find(FIND_SOURCES);
                if (repairer.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    repairer.moveTo(sources[0]);
                }
            }
            else {
                if (repairer.repair(Game.getObjectById(repairTask.targetId)) == ERR_NOT_IN_RANGE) {
                    repairer.moveTo(repairer.room.controller);
                }
            }
        });
    }
    const buildTask = task_1.default.list.find(task => task.action === task_1.TaskAction.repair);
    if (buildTask) {
        builders.forEach(builder => {
            if (builder.store[RESOURCE_ENERGY] == 0) {
                const sources = builder.room.find(FIND_SOURCES);
                if (builder.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    builder.moveTo(sources[0]);
                }
            }
            else {
                if (builder.build(Game.getObjectById(buildTask.targetId)) == ERR_NOT_IN_RANGE) {
                    builder.moveTo(builder.room.controller);
                }
            }
        });
    }
    const upGradeTask = task_1.default.list.find(task => task.action === task_1.TaskAction.repair);
    if (upGradeTask) {
        upGraders.forEach(upGrader => {
            if (upGrader.store[RESOURCE_ENERGY] == 0) {
                const sources = upGrader.room.find(FIND_SOURCES);
                if (upGrader.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    upGrader.moveTo(sources[0]);
                }
            }
            else {
                if (upGrader.upgradeController(Game.getObjectById(upGradeTask.targetId)) == ERR_NOT_IN_RANGE) {
                    upGrader.moveTo(upGrader.room.controller);
                }
            }
        });
    }
}
exports.goToWork = goToWork;
