"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRepairTask = exports.repair = void 0;
const checkConstructor_1 = require("./checkConstructor");
const task_1 = require("./task");
function repair(creep, target) {
}
exports.repair = repair;
const golHtx = 3 / 4;
function checkRepairTask() {
    const hitsDanger = (0, checkConstructor_1.checkAllCHits)();
    if (hitsDanger.length) {
        const first = hitsDanger.sort((struA, struB) => struA.currPercent - struB.currPercent)[0];
        // 派发需要治疗的任务
        task_1.default.addTask({
            action: task_1.TaskAction.repair,
            targetId: first.structure.id,
            // todo 找不到原因，先判断是不是target 不存在了，但是 repair 任务还没有取消
            couldCancel: () => !(0, checkConstructor_1.isDanger)(Game.getObjectById(first.structure.id), golHtx),
        });
    }
}
exports.checkRepairTask = checkRepairTask;
