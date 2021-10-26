"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCreeps = void 0;
const task_1 = require("./task");
const creepsList_1 = require("./creepsList");
let index = 0;
function Create(actionType) {
    // find the first or 0th spawn in the room
    let spawn = Object.values(Game.rooms)[0].find(FIND_MY_SPAWNS)[0];
    let result = spawn.spawnCreep([WORK, MOVE, CARRY], (index++).toString(), { memory: {
            action: actionType,
            workStatus: task_1.WorkingStatus.relaxing
        } });
}
function createCreeps() {
    const { repairers, builders, upGraders } = creepsList_1.default;
    const repairTask = task_1.default.list.find(task => task.action === task_1.TaskAction.repair);
    const buildTask = task_1.default.list.find(task => task.action === task_1.TaskAction.build);
    const upGradeTask = task_1.default.list.find(task => task.action === task_1.TaskAction.upgrade);
    if (repairers.length < 2 && repairTask) {
        Create(task_1.TaskAction.repair);
    }
    if (builders.length < 4 && buildTask) {
        Create(task_1.TaskAction.build);
    }
    if (upGraders.length < 2) {
        Create(task_1.TaskAction.upgrade);
    }
}
exports.createCreeps = createCreeps;
