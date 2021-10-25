"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCreepsList = exports.CreepsList = void 0;
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
        if (creep.memory.action === TaskAction.repair) {
            repairers.push(creep);
        }
        if (creep.memory.action === TaskAction.build) {
            builders.push(creep);
        }
        if (creep.memory.action === TaskAction.upgrade) {
            upGraders.push(creep);
        }
    });
    ListInstance.repairers = repairers;
    ListInstance.builders = builders;
    ListInstance.upGraders = upGraders;
}
exports.updateCreepsList = updateCreepsList;
exports.default = ListInstance;
