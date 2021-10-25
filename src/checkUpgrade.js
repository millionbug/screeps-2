"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpgrade = void 0;
const task_1 = require("./task");
function checkUpgrade() {
    if (!task_1.default.list.length) {
        task_1.default.addTask({
            action: task_1.TaskAction.upgrade,
            targetId: Game.rooms[0].controller.id,
            couldCancel: () => {
                return Boolean(task_1.default.list.length);
            }
        });
    }
}
exports.checkUpgrade = checkUpgrade;
