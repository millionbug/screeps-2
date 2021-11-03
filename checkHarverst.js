"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHarverstTask = void 0;
const task_1 = require("./task");
const source_1 = require("./source");
function checkHarverstTask() {
    if (source_1.sourceGlobal.sourcesList.length) {
        source_1.sourceGlobal.sourcesList.forEach(source => {
            const container = source.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: stru => {
                    return stru.structureType === STRUCTURE_CONTAINER && source.pos.x - stru.pos.x < 3;
                }
            });
            if (container && !task_1.default.list.find(item => item.targetId === source.id)) {
                task_1.default.addTask({
                    action: task_1.TaskAction.harvest,
                    targetId: source.id,
                    couldCancel: () => {
                        if (source === null || source === void 0 ? void 0 : source.energy) {
                            const container = source.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: stru => stru.structureType === STRUCTURE_CONTAINER
                            });
                            return !container || (container === null || container === void 0 ? void 0 : container.store.energy) === (container === null || container === void 0 ? void 0 : container.store.getCapacity());
                        }
                        return !source || !source.energy;
                    },
                });
            }
        });
    }
}
exports.checkHarverstTask = checkHarverstTask;
