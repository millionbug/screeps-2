"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBuildTask = void 0;
const source_1 = require("./source");
const task_1 = require("./task");
function checkBuildTask() {
    const buildList = source_1.room.find(FIND_CONSTRUCTION_SITES);
    if (buildList.length) {
        const target = buildList[0];
        task_1.default.addTask({
            action: task_1.TaskAction.build,
            targetId: target.id,
            couldCancel: () => {
                const currentT = Game.constructionSites[target.id];
                return !currentT || (currentT.progressTotal === currentT.progress);
            }
        });
    }
}
exports.checkBuildTask = checkBuildTask;
