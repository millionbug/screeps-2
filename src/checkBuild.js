"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBuildTask = void 0;
const task_1 = require("./task");
function checkBuildTask() {
    const room = Game.rooms[Object.keys(Game.rooms)[0]];
    const buildList = room.find(FIND_CONSTRUCTION_SITES);
    if (buildList.length) {
        const target = buildList[0];
        task_1.default.addTask({
            action: task_1.TaskAction.build,
            targetId: target.id,
            couldCancel: () => {
                return target.progressTotal === target.progress;
            }
        });
    }
}
exports.checkBuildTask = checkBuildTask;
