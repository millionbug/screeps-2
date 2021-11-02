"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCreepsList = exports.checkActive = exports.CreepsList = void 0;
const task_1 = require("./task");
const source_1 = require("./source");
class CreepsList {
    constructor() {
        this.repairers = [];
        this.builders = [];
        this.upGraders = [];
        this.harversters = [];
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
    const harversters = [];
    // 清除已死去的 creep 的 memory 信息
    checkActive();
    // 清除已死去的登记在 source 中的信息
    source_1.default.checkCreepActive();
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
        if (creep.memory.action === task_1.TaskAction.harvest) {
            harversters.push(creep);
        }
    });
    ListInstance.repairers = repairers;
    ListInstance.builders = builders;
    ListInstance.upGraders = upGraders;
    ListInstance.harversters = harversters;
}
exports.updateCreepsList = updateCreepsList;
exports.default = ListInstance;
