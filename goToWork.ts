import CreepsList from './creepsList';
import TaskList, { TaskAction, WorkingStatus } from './task';
import { upGraderWork, buildWork, repairWork, harverstWork, transferWrok } from './work';


export function goToWork() {
    const { repairers, builders, upGraders, harversters, transfers } = CreepsList;
    
    const repairTask = TaskList.list.find(task => task.action === TaskAction.repair);
    const buildTask = TaskList.list.find(task => task.action === TaskAction.build);
    const upGradeTask = TaskList.list.find(task => task.action === TaskAction.upgrade);
    const harverstTasks = TaskList.list.filter(task => task.action === TaskAction.harvest);
    const transferTask = TaskList.list.find(task => task.action === TaskAction.transfer);

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

    if (transferTask) {
        transfers.forEach(creep => {
            transferWrok(creep, transferTask);
        });
    } else {
        notWorkCreeps = notWorkCreeps.concat(transfers);
    }

    const methods = [transferWrok, repairWork, buildWork, upGraderWork];
    const tasks = [transferTask, repairTask, buildTask, upGradeTask];
    const index = tasks.findIndex(Boolean);
    if (notWorkCreeps.length) {
        notWorkCreeps.forEach(creep => {
            methods[index](creep, tasks[index]);
        })
    }

    if (harverstTasks) {
        harverstTasks.forEach(task => {
            if (task.currentWorkerName && Game.creeps[task.currentWorkerName]) {
                harverstWork(Game.creeps[task.currentWorkerName], task);
            } else {
                delete task.currentWorkerName;
                const har = harversters.find(haster => {
                    const result =  harverstTasks.every(t => {
                        return t.currentWorkerName !== haster.name;
                    })
                    return result;
                });
                if (har) {
                    harverstWork(har, task);
                }
            }
        })
    }
}