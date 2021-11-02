"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpgrade = void 0;
const source_1 = require("./source");
const task_1 = require("./task");
function checkUpgrade() {
    if (!task_1.default.list.length) {
        task_1.default.addTask({
            action: task_1.TaskAction.upgrade,
            targetId: source_1.room.controller.id,
            couldCancel: () => {
                return Boolean(task_1.default.list.length > 1);
            }
        });
        return;
    }
    if (source_1.room.controller.ticksToDowngrade < 9000) {
        task_1.default.addTask({
            action: task_1.TaskAction.upgrade,
            targetId: source_1.room.controller.id,
            couldCancel: () => {
                return source_1.room.controller.ticksToDowngrade > 10000;
            }
        });
    }
}
exports.checkUpgrade = checkUpgrade;
