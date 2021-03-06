"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goToWork = void 0;
const creepsList_1 = require("./creepsList");
const task_1 = require("./task");
const work_1 = require("./work");
function goToWork() {
    const { repairers, builders, upGraders, harversters, transfers, attackers } = creepsList_1.default;
    const repairTask = task_1.default.list.find(task => task.action === task_1.TaskAction.repair);
    const buildTask = task_1.default.list.find(task => task.action === task_1.TaskAction.build);
    const upGradeTask = task_1.default.list.find(task => task.action === task_1.TaskAction.upgrade);
    const harverstTasks = task_1.default.list.filter(task => task.action === task_1.TaskAction.harvest);
    const transferTask = task_1.default.list.find(task => task.action === task_1.TaskAction.transfer);
    const attackTask = task_1.default.list.find(task => task.action === task_1.TaskAction.attack);
    let notWorkCreeps = [];
    if (attackTask) {
        // console.log('attacking', attackers.length)
        attackers.forEach(creep => {
            (0, work_1.attack)(creep, attackTask);
        });
    }
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
    if (transferTask) {
        transfers.forEach(creep => {
            (0, work_1.transferWrok)(creep, transferTask);
        });
    }
    else {
        notWorkCreeps = notWorkCreeps.concat(transfers);
    }
    const methods = [work_1.transferWrok, work_1.repairWork, work_1.buildWork, work_1.upGraderWork];
    const tasks = [transferTask, repairTask, buildTask, upGradeTask];
    const index = tasks.findIndex(Boolean);
    if (notWorkCreeps.length) {
        notWorkCreeps.forEach(creep => {
            methods[index](creep, tasks[index]);
        });
    }
    if (harverstTasks) {
        harverstTasks.forEach(task => {
            if (task.currentWorkerName && Game.creeps[task.currentWorkerName]) {
                (0, work_1.harverstWork)(Game.creeps[task.currentWorkerName], task);
            }
            else {
                delete task.currentWorkerName;
                const har = harversters.find(haster => {
                    const result = harverstTasks.every(t => {
                        return t.currentWorkerName !== haster.name;
                    });
                    return result;
                });
                if (har) {
                    (0, work_1.harverstWork)(har, task);
                }
            }
        });
    }
}
exports.goToWork = goToWork;
