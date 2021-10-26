"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpgrade = void 0;
const task_1 = require("./task");
function checkUpgrade() {
    const room = Object.values(Game.rooms)[0];
    if (!task_1.default.list.length) {
        task_1.default.addTask({
            action: task_1.TaskAction.upgrade,
            targetId: room.controller.id,
            couldCancel: () => {
                return Boolean(task_1.default.list.length > 1);
            }
        });
        return;
    }
    if (room.controller.ticksToDowngrade < 9000) {
        task_1.default.addTask({
            action: task_1.TaskAction.upgrade,
            targetId: room.controller.id,
            couldCancel: () => {
                return room.controller.ticksToDowngrade > 10000;
            }
        });
    }
}
exports.checkUpgrade = checkUpgrade;
