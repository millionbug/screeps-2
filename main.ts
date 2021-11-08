import {checkRepairTask} from './checkRepair';
import { checkBuildTask } from './checkBuild';
import { checkUpgrade } from './checkUpgrade';
import { goToWork } from './goToWork';
import { createCreeps } from './createCreeps';
import TaskList from './task';
import { checkHarverstTask } from './checkHarverst';
import { checkTransferTask } from './checkExtension';
import { updateGlobalAtLoop } from './utils';
import { checkAttackTask } from './checkHostile';

export function loop() {
    // 检查所有的资源
    updateGlobalAtLoop();

    TaskList.checkList();

    checkAttackTask();
    checkHarverstTask();
    checkRepairTask();
    checkBuildTask();
    checkTransferTask();
    checkUpgrade();

    createCreeps();

    goToWork();

}
