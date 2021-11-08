"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAttackTask = void 0;
const task_1 = require("./task");
const creepsList_1 = require("./creepsList");
const golHtx = 3 / 4;
function checkAttackTask() {
    var _a;
    const enemys = creepsList_1.enemyList.list;
    if (enemys.length) {
        const id = (_a = enemys[0]) === null || _a === void 0 ? void 0 : _a.id;
        // 派发需要治疗的任务
        task_1.default.addTask({
            action: task_1.TaskAction.attack,
            targetId: id,
            couldCancel: () => {
                return !creepsList_1.enemyList.getEnemy(id);
            }
        });
    }
}
exports.checkAttackTask = checkAttackTask;
