"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRepairTask = exports.repair = void 0;
const utils_1 = require("./utils");
const task_1 = require("./task");
function repair(creep, target) {
}
exports.repair = repair;
function checkRepairTask() {
    const hitsDanger = (0, utils_1.checkAllCHits)();
    if (hitsDanger.length) {
        const first = hitsDanger.sort((struA, struB) => struA.currPercent - struB.currPercent)[0];
        // 派发需要治疗的任务
        task_1.default.addTask({
            action: task_1.TaskAction.repair,
            targetId: first.structure.id,
            couldCancel: () => !(0, utils_1.isDanger)(first.structure),
        });
    }
}
exports.checkRepairTask = checkRepairTask;
