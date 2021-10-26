import CreepsList from './creepsList';
import TaskList, { TaskAction } from './task';

export function work(creep: Creep, workFn) {
    if(creep.store[RESOURCE_ENERGY] == 0) {
        const sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    } else {
        workFn();
    }
}

export function goToWork() {
    const { repairers, builders, upGraders } = CreepsList;
    
    const repairTask = TaskList.list.find(task => task.action === TaskAction.repair);
    if (repairTask) {
        const workFn = (repairer: Creep) => {
            return () => {
                const target = Game.structures[repairTask.targetId];
                if(repairer.repair(target) == ERR_NOT_IN_RANGE) {
                    repairer.moveTo(target);
                }
            }
        }
        repairers.forEach(repairer => {
            work(repairer, workFn(repairer));
        })
    }

    const buildTask = TaskList.list.find(task => task.action === TaskAction.repair);

    if (buildTask) {
        const workFn = (builder: Creep) => {
            return () => {
                const target = Game.constructionSites[repairTask.targetId];
                if(builder.build(target) == ERR_NOT_IN_RANGE) {
                    builder.moveTo(target);
                }
            }
        }
        builders.forEach(builder => {
            work(builder, workFn(builder));
        })
    }

    const upGradeTask = TaskList.list.find(task => task.action === TaskAction.repair);
    if (upGradeTask) {
        const workFn = (upGrader: Creep) => {
            return () => {
                const target = upGrader.room.controller;
                if(upGrader.upgradeController(target) == ERR_NOT_IN_RANGE) {
                    upGrader.moveTo(target);
                }
            }
        }
        upGraders.forEach(upGrader => {
            work(upGrader, workFn(upGrader));
        })
    }

}