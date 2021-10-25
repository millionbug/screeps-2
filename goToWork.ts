import CreepsList from './creepsList';
import TaskList, { TaskAction } from './task';

export function goToWork() {
    const { repairers, builders, upGraders } = CreepsList;
    
    const repairTask = TaskList.list.find(task => task.action === TaskAction.repair);
    if (repairTask) {
        repairers.forEach(repairer => {
            if(repairer.store[RESOURCE_ENERGY] == 0) {
                const sources = repairer.room.find(FIND_SOURCES);
                if(repairer.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    repairer.moveTo(sources[0]);
                }
            } else {
                if(repairer.repair(Game.getObjectById(repairTask.targetId)) == ERR_NOT_IN_RANGE) {
                    repairer.moveTo(repairer.room.controller);
                }
            }
        })
    }

    const buildTask = TaskList.list.find(task => task.action === TaskAction.repair);

    if (buildTask) {
        builders.forEach(builder => {
            if(builder.store[RESOURCE_ENERGY] == 0) {
                const sources = builder.room.find(FIND_SOURCES);
                if(builder.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    builder.moveTo(sources[0]);
                }
            } else {
                if(builder.build(Game.getObjectById(buildTask.targetId)) == ERR_NOT_IN_RANGE) {
                    builder.moveTo(builder.room.controller);
                }
            }
        })
    }

    const upGradeTask = TaskList.list.find(task => task.action === TaskAction.repair);
console.log('upGradeTask', upGradeTask, 'upGraders', upGraders)
    if (upGradeTask) {
        upGraders.forEach(upGrader => {
            if(upGrader.store[RESOURCE_ENERGY] == 0) {
                console.log('buxqu采药吗')
                const sources = upGrader.room.find(FIND_SOURCES);
                if(upGrader.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    upGrader.moveTo(sources[0]);
                }
            } else {
                if(upGrader.upgradeController(Game.getObjectById(upGradeTask.targetId)) == ERR_NOT_IN_RANGE) {
                    upGrader.moveTo(upGrader.room.controller);
                }
            }
        })
    }

}