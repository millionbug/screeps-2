import CreepsList from './creepsList';
import TaskList, { TaskAction, WorkingStatus } from './task';
import { upGraderWork, buildWork, repairWork, harverstWork } from './work';


export function goToWork() {
    const { repairers, builders, upGraders, harversters } = CreepsList;
    
    const repairTask = TaskList.list.find(task => task.action === TaskAction.repair);
    const buildTask = TaskList.list.find(task => task.action === TaskAction.build);
    const upGradeTask = TaskList.list.find(task => task.action === TaskAction.upgrade);
    const harverstTasks = TaskList.list.filter(task => task.action === TaskAction.harvest);

    let notWorkCreeps: Creep[] = []

    if (repairTask) {
        repairers.forEach(repairer => {
            repairWork(repairer, repairTask);
        })
    } else {
        notWorkCreeps = notWorkCreeps.concat(repairers);
    }

    if (upGradeTask) {
        upGraders.forEach(upGrader => {
            upGraderWork(upGrader)
        })
    }  else {
        notWorkCreeps = notWorkCreeps.concat(upGraders);
    }


    if (buildTask) {
        builders.forEach(builder => {
            buildWork(builder, buildTask);
        })
    } else {
        notWorkCreeps = notWorkCreeps.concat(builders);
    }

    const methods = [repairWork, buildWork, upGraderWork];
    const tasks = [repairTask, buildTask, upGradeTask];
    const index = tasks.findIndex(Boolean);
    if (notWorkCreeps.length) {
        // console.log(tasks[index], index, 'index')
        notWorkCreeps.forEach(creep => {
            methods[index](creep, tasks[index]);
        })
    }


    if (harverstTasks) {
        harverstTasks.forEach(task => {
            if (task.currentWorker && Game.creeps[task.currentWorker.name]) {
                harverstWork(task.currentWorker, task);
            } else {
                const har = harversters.find(haster => {
                    return harverstTasks.every(t => {
                        return t.currentWorker !== haster;
                    })
                });
                harverstWork(har, task);
            }
        })
    }
}