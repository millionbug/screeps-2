"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goToWork = void 0;
const creepsList_1 = require("./creepsList");
const task_1 = require("./task");
const work_1 = require("./work");
function goToWork() {
    const { repairers, builders, upGraders, harversters } = creepsList_1.default;
    const repairTask = task_1.default.list.find(task => task.action === task_1.TaskAction.repair);
    const buildTask = task_1.default.list.find(task => task.action === task_1.TaskAction.build);
    const upGradeTask = task_1.default.list.find(task => task.action === task_1.TaskAction.upgrade);
    if (repairTask) {
        console.log(repairTask.targetId, 'repairTask.targetId');
        repairers.forEach(repairer => {
            (0, work_1.repairWork)(repairer, repairTask);
        });
    }
    else if (buildTask) {
        repairers.forEach(repairer => {
            (0, work_1.buildWork)(repairer, buildTask);
        });
    }
    if (upGradeTask) {
        upGraders.forEach(upGrader => {
            (0, work_1.upGraderWork)(upGrader);
        });
    }
    else if (buildTask) {
        upGraders.forEach(upGrader => {
            (0, work_1.buildWork)(upGrader, buildTask);
        });
    }
    else if (repairTask) {
        upGraders.forEach(upGrader => {
            (0, work_1.repairWork)(upGrader, repairTask);
        });
    }
    if (buildTask) {
        builders.forEach(builder => {
            (0, work_1.buildWork)(builder, buildTask);
        });
    }
    // if (harversters) {
    //     harversters.forEach(creep => )
    // }
}
exports.goToWork = goToWork;
