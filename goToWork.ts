import { solveTask } from 'utils';
import CreepsList from './creepsList';
import TaskList, { Task, TaskAction, WorkingStatus } from './task';
import { upGraderWork, buildWork, repairWork, harverstWork, transferWrok, attack } from './work';


export function goToWork() {
    const { repairers, builders, upGraders, harversters, transfers, attackers } = CreepsList;
    
    const repairTasks = TaskList.list.filter(task => task.action === TaskAction.repair);
    const buildTasks = TaskList.list.filter(task => task.action === TaskAction.build);
    const upGradeTask = TaskList.list.find(task => task.action === TaskAction.upgrade);
    const harverstTasks = TaskList.list.filter(task => task.action === TaskAction.harvest);
    const transferTasks = TaskList.list.filter(task => task.action === TaskAction.transfer);
    const attackTasks = TaskList.list.filter(task => task.action === TaskAction.attack);


    let notWorkCreeps: Creep[] = [];

    let freeWorker: Creep[] = [];
    let queTasks: Task[] = [];
    let workingCreeps: string[] = [];
    TaskList.list.forEach(task => {
        if (task.currentWorkerName?.length) {
            const currWorkers = task.currentWorkerName.map(name => {
                workingCreeps.push(name);
                return Game.creeps[name];
            });
            currWorkers.forEach(worker => {
                solveTask(worker, task);
            })
        } else {
            queTasks.push(task);
        }
    });

    queTasks




    // if (attackTask) {
    //     if (attackTask.currentWorkerName?.length) {
    //         const 
    //     }
    //     attackers.forEach(creep => {
    //         attack(creep, attackTask);
    //     });
    // }

    // if (repairTasks) {
    //     let repairTasksLen = repairTasks.length;
    //     let workerLen = repairers.length;

    //     repairers.forEach(repairer => {
    //         repairWork(repairer, repairTask);
    //     })
    // } else {
    //     notWorkCreeps = notWorkCreeps.concat(repairers);
    // }

    // if (upGradeTask) {
    //     upGraders.forEach(upGrader => {
    //         upGraderWork(upGrader)
    //     })
    // }  else {
    //     notWorkCreeps = notWorkCreeps.concat(upGraders);
    // }


    // if (buildTask) {
    //     builders.forEach(builder => {
    //         buildWork(builder, buildTask);
    //     })
    // } else {
    //     notWorkCreeps = notWorkCreeps.concat(builders);
    // }

    // if (transferTask) {
    //     transfers.forEach(creep => {
    //         transferWrok(creep, transferTask);
    //     });
    // } else {
    //     notWorkCreeps = notWorkCreeps.concat(transfers);
    // }

    // const methods = [transferWrok, repairWork, buildWork, upGraderWork];
    // const tasks = [transferTask, repairTask, buildTask, upGradeTask];
    // const index = tasks.findIndex(Boolean);
    // if (notWorkCreeps.length) {
    //     notWorkCreeps.forEach(creep => {
    //         methods[index](creep, tasks[index]);
    //     })
    // }

    // if (harverstTasks) {
    //     harverstTasks.forEach(task => {
    //         const harverster = Game.creeps[task.currentWorkerName[0]];
    //         if (task.currentWorkerName && harverster) {
    //             harverstWork(harverster, task);
    //         } else {
    //             delete task.currentWorkerName;
    //             const har = harversters.find(haster => {
    //                 const result =  harverstTasks.every(t => {
    //                     return !t.currentWorkerName.includes(haster.name);
    //                 })
    //                 return result;
    //             });
    //             if (har) {
    //                 harverstWork(har, task);
    //             }
    //         }
    //     })
    // }
}