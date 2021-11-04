"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBuildTask = void 0;
const room_1 = require("./room");
const task_1 = require("./task");
function checkBuildTask() {
    const buildList = room_1.room.find(FIND_CONSTRUCTION_SITES);
    if (buildList.length) {
        const target = buildList[0];
        const id = target.id;
        task_1.default.addTask({
            action: task_1.TaskAction.build,
            targetId: id,
            couldCancel: () => {
                const currentT = Game.constructionSites[id];
                return !currentT || (currentT.progressTotal === currentT.progress);
            }
        });
    }
}
exports.checkBuildTask = checkBuildTask;
