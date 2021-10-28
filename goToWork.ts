import CreepsList from './creepsList';
import TaskList, { TaskAction, WorkingStatus } from './task';
import { upGraderWork, buildWork, repairWork } from './work';


export function goToWork() {
    const { repairers, builders, upGraders, harversters } = CreepsList;
    
    const repairTask = TaskList.list.find(task => task.action === TaskAction.repair);
    const buildTask = TaskList.list.find(task => task.action === TaskAction.build);
    const upGradeTask = TaskList.list.find(task => task.action === TaskAction.upgrade);


    if (repairTask) {
        console.log(repairTask.targetId)
        repairers.forEach(repairer => {
            repairWork(repairer, repairTask);
        })
    } else if (buildTask) {
        repairers.forEach(repairer => {
            buildWork(repairer, buildTask);
        })
    }


    if (upGradeTask) {
        upGraders.forEach(upGrader => {
            upGraderWork(upGrader)
        })
    } else if (buildTask) {
        upGraders.forEach(upGrader => {
            buildWork(upGrader, buildTask);
        })
    }

    if (buildTask) {
        builders.forEach(builder => {
            buildWork(builder, buildTask);
        })
    }

    // if (harversters) {
    //     harversters.forEach(creep => )
    // }
}