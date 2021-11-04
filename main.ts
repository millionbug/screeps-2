import {checkRepairTask} from './checkRepair';
import { checkBuildTask } from './checkBuild';
import { checkUpgrade } from './checkUpgrade';
import { goToWork } from './goToWork';
import { createCreeps } from './createCreeps';
import TaskList from './task';
import { checkHarverstTask } from './checkHarverst';
import { updateGlobalAtLoop } from './utils';

export function loop() {
    // 检查所有的资源
    updateGlobalAtLoop();

    TaskList.checkList();

    checkHarverstTask();
    checkRepairTask();
    checkBuildTask();
    checkUpgrade();

    createCreeps();

    goToWork();

}