"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goToWork = void 0;
const creepsList_1 = require("./creepsList");
const task_1 = require("./task");
const work_1 = require("./work");
function goToWork() {
    const { repairers, builders, upGraders } = creepsList_1.default;
    const repairTask = task_1.default.list.find(task => task.action === task_1.TaskAction.repair);
    const buildTask = task_1.default.list.find(task => task.action === task_1.TaskAction.build);
    const upGradeTask = task_1.default.list.find(task => task.action === task_1.TaskAction.upgrade);
    if (repairTask) {
        console.log(repairTask.targetId);
        repairers.forEach(repairer => {
            (0, work_1.repairWork)(repairer, repairTask);
        });
    }
    else if (buildTask) {
        console.log('不是没有 repair 任务了么2');
        repairers.forEach(repairer => {
            (0, work_1.buildWork)(repairer, buildTask);
        });
    }
    if (upGradeTask) {
        console.log(upGradeTask.targetId);
        upGraders.forEach(upGrader => {
            (0, work_1.upGraderWork)(upGrader);
        });
    }
    else if (buildTask) {
        upGraders.forEach(upGrader => {
            (0, work_1.buildWork)(upGrader, buildTask);
        });
    }
    if (buildTask) {
        console.log(buildTask.targetId);
        builders.forEach(builder => {
            (0, work_1.buildWork)(builder, buildTask);
        });
    }
}
exports.goToWork = goToWork;
