import { TaskAction } from './task';
export class CreepsList {
    repairers: Creep[] = [];
    builders: Creep[] = [];
    upGraders: Creep[] = [];
}

const ListInstance = new CreepsList();

export function updateCreepsList() {
    const creeps = Object.values(Game.creeps);
    const repairers: Creep[] = [];
    const builders: Creep[] = [];
    const upGraders: Creep[] = [];

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

export default ListInstance;