"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpgrade = void 0;
const room_1 = require("./room");
const task_1 = require("./task");
function checkUpgrade() {
    const list = task_1.default.list.filter(task => {
        return [task_1.TaskAction.repair, task_1.TaskAction.build].includes(task.action);
    });
    // todo 非采集任务为空时
    if (!list.length) {
        task_1.default.addTask({
            action: task_1.TaskAction.upgrade,
            targetId: room_1.room.instance.controller.id,
            couldCancel: () => {
                return Boolean(task_1.default.list.length > 1);
            }
        });
        return;
    }
    if (room_1.room.instance.controller.ticksToDowngrade < 9000) {
        task_1.default.addTask({
            action: task_1.TaskAction.upgrade,
            targetId: room_1.room.instance.controller.id,
            couldCancel: () => {
                return room_1.room.instance.controller.ticksToDowngrade > 10000;
            }
        });
    }
}
exports.checkUpgrade = checkUpgrade;
