import { sourceGlobal } from './source';
import { structureGlobal } from './structure';
import { updateCreepsList, enemyList } from "./creepsList";
import { room } from './room';
import { Task, TaskAction } from './task';
import { upGraderWork, buildWork, repairWork, harverstWork, transferWrok, attack } from './work';


export function updateGlobalAtLoop() {
    sourceGlobal.updateSourceList();
    structureGlobal.updateStructuresList();
    room.updateRoom();
    enemyList.updateEnemysList();

    updateCreepsList();
}

export function evevryTask(workers: Creep[], tasks: Task[]) {
    let i = 0;
    let len = workers.length;
    while(len) {

        len--;
    }
}

export function solveTask(worker: Creep, task: Task) {
    switch(task.action) {
        case TaskAction.attack: attack(worker, task);break;
        case TaskAction.repair: repairWork(worker, task);break;
        case TaskAction.upgrade: upGraderWork(worker);break;
        case TaskAction.build: buildWork(worker, task);break;
        case TaskAction.transfer: transferWrok(worker, task);break;
    }
}


