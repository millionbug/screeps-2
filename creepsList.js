"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCreepsList = exports.checkActive = exports.CreepsList = void 0;
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
function checkActive() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}
exports.checkActive = checkActive;
function updateCreepsList() {
    const creeps = Object.values(Game.creeps);
    const repairers = [];
    const builders = [];
    const upGraders = [];
    checkActive();
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
