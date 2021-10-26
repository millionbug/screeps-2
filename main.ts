import {checkRepairTask} from './checkRepair';
import { checkBuildTask } from './checkBuild';
import { checkUpgrade } from './checkUpgrade';
import { goToWork } from './goToWork';
import { createCreeps } from './createCreeps';
import TaskList from './task';
import { updateCreepsList } from 'creepsList';

export function loop() {

    // 检查 creeps 
    updateCreepsList();

    TaskList.checkList();

    checkRepairTask();
    checkBuildTask();
    checkUpgrade();

    createCreeps();

    goToWork();

}