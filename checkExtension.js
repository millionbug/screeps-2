"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTransferTask = exports.repair = void 0;
const checkConstructor_1 = require("./checkConstructor");
const task_1 = require("./task");
const structure_1 = require("./structure");
const creepsList_1 = require("./creepsList");
function repair(creep, target) {
}
exports.repair = repair;
const golHtx = 3 / 4;
function checkTransferTask() {
    const freeList = (0, checkConstructor_1.checkAllEnergy)([STRUCTURE_SPAWN, STRUCTURE_EXTENSION]);
    const { transfers } = creepsList_1.default;
    if (freeList.length) {
        const first = freeList.sort((struA, struB) => struA.free - struB.free)[0];
        const id = first.structure.id;
        // 派发需要治疗的任务
        task_1.default.addTask({
            action: task_1.TaskAction.transfer,
            targetId: id,
            couldCancel: () => !(0, checkConstructor_1.isFull)(structure_1.structureGlobal.findStructureById(id)) || transfers.length > 4,
        });
    }
}
exports.checkTransferTask = checkTransferTask;
