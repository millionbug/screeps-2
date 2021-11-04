"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCreeps = void 0;
const task_1 = require("./task");
const creepsList_1 = require("./creepsList");
const room_1 = require("./room");
let index = 0;
function Create(actionType, createOptions) {
    const spawn = room_1.room.find(FIND_MY_SPAWNS)[0];
    const name = (index++).toString();
    const body = (createOptions === null || createOptions === void 0 ? void 0 : createOptions.body) || [WORK, MOVE, CARRY];
    let result = spawn && spawn.spawnCreep(body, name, { memory: {
            action: actionType,
            workStatus: task_1.WorkingStatus.relaxing
        } });
}
function createHaverster() {
    Create(task_1.TaskAction.harvest, {
        body: [WORK, WORK, MOVE]
    });
}
function createCreeps() {
    const { repairers, builders, upGraders, harversters, transfers } = creepsList_1.default;
    const repairTask = task_1.default.list.find(task => task.action === task_1.TaskAction.repair);
    const buildTask = task_1.default.list.find(task => task.action === task_1.TaskAction.build);
    const upGradeTask = task_1.default.list.find(task => task.action === task_1.TaskAction.upgrade);
    const harverstTasks = task_1.default.list.filter(task => task.action === task_1.TaskAction.harvest);
    const transferTask = task_1.default.list.find(task => task.action === task_1.TaskAction.transfer);
    if (repairers.length < 2 && repairTask) {
        Create(task_1.TaskAction.repair);
    }
    if (builders.length < 4 && buildTask) {
        Create(task_1.TaskAction.build);
    }
    if (upGraders.length < 8) {
        Create(task_1.TaskAction.upgrade);
    }
    // transfer 任务例外，否则永远停不下来
    if (transferTask && transfers.length < 6) {
        Create(task_1.TaskAction.transfer);
    }
    if (harverstTasks.length > harversters.length) {
        createHaverster();
    }
}
exports.createCreeps = createCreeps;
