import {checkRepairTask} from './src/checkRepair';
import { checkBuildTask } from './src/checkBuild';
import { checkUpgrade } from '@/checkUpgrade';
import { goToWork } from '@/goToWork';
import { checkActive, createCreeps } from '@/createCreeps';
export default function loop() {

    checkActive();

    checkRepairTask();
    checkBuildTask();
    checkUpgrade();

    goToWork();
}