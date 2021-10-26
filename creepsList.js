"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCreepsList = exports.CreepsList = void 0;
const task_1 = require("./task");
class CreepsList {
    constructor() {
        this.repairers = [];
        this.builders = [];
        this.upGraders = [];
    }
}
exports.CreepsList = CreepsList;
const ListInstance = new CreepsList();
function updateCreepsList() {
    const creeps = Object.values(Game.creeps);
    const repairers = [];
    const builders = [];
    const upGraders = [];
    creeps.forEach((creep) => {
        if (creep.memory.action === task_1.TaskAction.repair) {
            repairers.push(creep);
        }
        if (creep.memory.action === task_1.TaskAction.build) {
            builders.push(creep);
        }
        if (creep.memory.action === task_1.TaskAction.upgrade) {
            upGraders.push(creep);
        }
    });
    ListInstance.repairers = repairers;
    ListInstance.builders = builders;
    ListInstance.upGraders = upGraders;
}
exports.updateCreepsList = updateCreepsList;
exports.default = ListInstance;
