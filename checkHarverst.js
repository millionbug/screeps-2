"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHarverstTask = void 0;
const room_1 = require("./room");
const task_1 = require("./task");
function checkHarverstTask() {
    const sourceList = room_1.room.find(FIND_SOURCES);
    if (sourceList.length) {
        sourceList.forEach(source => {
            if (!task_1.default.list.find(item => item.targetId === source.id)) {
                task_1.default.addTask({
                    action: task_1.TaskAction.harvest,
                    targetId: source.id,
                    couldCancel: () => {
                        if (source === null || source === void 0 ? void 0 : source.energy) {
                            const container = source.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: stru => stru.structureType === STRUCTURE_CONTAINER
                            });
                            console.log('container.store.energy === container.store.getCapacity()', container.store.energy, container.store.getCapacity());
                            return !container || container.store.energy === container.store.getCapacity();
                        }
                        return !source || !source.energy;
                    },
                });
            }
        });
    }
}
exports.checkHarverstTask = checkHarverstTask;
