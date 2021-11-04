import { TaskAction } from './task';
import sourceTable from './source';
export class CreepsList {
    creepsNumb: number;
    repairers: Creep[] = [];
    builders: Creep[] = [];
    upGraders: Creep[] = [];
    harversters: Creep[] = [];
    transfers: Creep[] = [];
}

const ListInstance = new CreepsList();

export function checkActive() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

export function updateCreepsList() {
    const creeps = Object.values(Game.creeps);
    ListInstance.repairers = [];
    ListInstance.builders = [];
    ListInstance.upGraders = [];
    ListInstance.harversters = [];
    ListInstance.transfers = [];

    // 清除已死去的 creep 的 memory 信息
    checkActive();
    // 清除已死去的登记在 source 中的信息
    sourceTable.checkCreepActive();

    creeps.forEach((creep) => {
        if (creep.memory.action === TaskAction.repair) {
            ListInstance.repairers.push(creep);
        }
        if (creep.memory.action === TaskAction.build) {
            ListInstance.builders.push(creep);
        }
        if (creep.memory.action === TaskAction.upgrade) {
            ListInstance.upGraders.push(creep);
        }
        if (creep.memory.action === TaskAction.harvest) {
            ListInstance.harversters.push(creep);
        }
        if (creep.memory.action === TaskAction.transfer) {
            ListInstance.transfers.push(creep);
        }
    });
    const { repairers, builders, upGraders, harversters, transfers } = ListInstance;
    ListInstance.creepsNumb = creeps.length;
}

export default ListInstance;