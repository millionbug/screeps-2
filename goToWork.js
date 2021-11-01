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
    let notWorkCreeps = [];
    if (repairTask) {
        repairers.forEach(repairer => {
            (0, work_1.repairWork)(repairer, repairTask);
        });
    }
    else {
        notWorkCreeps = notWorkCreeps.concat(repairers);
    }
    if (upGradeTask) {
        upGraders.forEach(upGrader => {
            (0, work_1.upGraderWork)(upGrader);
        });
    }
    else {
        notWorkCreeps = notWorkCreeps.concat(upGraders);
    }
    if (buildTask) {
        builders.forEach(builder => {
            (0, work_1.buildWork)(builder, buildTask);
        });
    }
    else {
        notWorkCreeps = notWorkCreeps.concat(builders);
    }
    const methods = [work_1.repairWork, work_1.buildWork, work_1.upGraderWork];
    const tasks = [repairTask, buildTask, upGradeTask];
    const index = tasks.findIndex(Boolean);
    if (notWorkCreeps.length) {
        // console.log(tasks[index], index, 'index')
        notWorkCreeps.forEach(creep => {
            methods[index](creep, tasks[index]);
        });
    }
    // if (harversters) {
    //     harversters.forEach(creep => )
    // }
}
exports.goToWork = goToWork;
