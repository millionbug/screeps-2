import CreepsList from './creepsList';
import TaskList, { TaskAction, WorkingStatus } from './task';
import { upGraderWork, buildWork, repairWork } from './work';


export function goToWork() {
    const { repairers, builders, upGraders } = CreepsList;
    
    const repairTask = TaskList.list.find(task => task.action === TaskAction.repair);
    const buildTask = TaskList.list.find(task => task.action === TaskAction.build);
    const upGradeTask = TaskList.list.find(task => task.action === TaskAction.upgrade);


    if (repairTask) {
        console.log(repairTask.targetId)
        repairers.forEach(repairer => {
            repairWork(repairer, repairTask);
        })
    } else if (buildTask) {
        console.log('不是没有 repair 任务了么2')
        repairers.forEach(repairer => {
            buildWork(repairer, buildTask);
        })
    }


    if (upGradeTask) {
        console.log(upGradeTask.targetId)

        upGraders.forEach(upGrader => {
            upGraderWork(upGrader)
        })
    } else if (buildTask) {
        upGraders.forEach(upGrader => {
            buildWork(upGrader, buildTask);
        })
    }

    if (buildTask) {
        console.log(buildTask.targetId)

        builders.forEach(builder => {
            buildWork(builder, buildTask);
        })
    }
}