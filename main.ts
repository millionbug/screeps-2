import {checkRepairTask} from './checkRepair';
import { checkBuildTask } from './checkBuild';
import { checkUpgrade } from './checkUpgrade';
import { goToWork } from './goToWork';
import { checkActive, createCreeps } from './createCreeps';
import TaskList from './task';
import { updateCreepsList } from 'creepsList';

export function loop() {

    updateCreepsList();

    checkActive();

    checkRepairTask();
    checkBuildTask();
    checkUpgrade();

    createCreeps();

    goToWork();

}