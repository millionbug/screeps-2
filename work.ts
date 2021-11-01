import TaskList, { Task, TaskAction, WorkingStatus } from './task';
import sourceTable from './source';


export function work(creep: Creep, workFn: () => void) {
    const source = sourceTable.findSourceAble(creep);
    sourceTable.markCreep(creep, source.id);
    creep.say(creep.store.energy.toString())
    creep.say(creep.memory.workStatus)
    
    if(creep.store.energy == 0 && creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
        creep.memory.workStatus = WorkingStatus.harvesting
    } else if (creep.memory.workStatus === WorkingStatus.harvesting && creep.store.energy < creep.store.getCapacity()) {
        const result = creep.harvest(source);
        creep.say(result.toString())
    } else {
        workFn();
    }
}

export function upGrader(upGrader: Creep) {
    return () => {
        const target = upGrader.room.controller;
        const result = upGrader.upgradeController(target);
        upGrader.say('upgarder' + result.toString());
        if(result == ERR_NOT_IN_RANGE) {
            upGrader.moveTo(target);
        } else if (upGrader.memory.workStatus === WorkingStatus.upgradeing) {
            if (upGrader.upgradeController(target) === ERR_NOT_ENOUGH_ENERGY) {
                upGrader.memory.workStatus = WorkingStatus.harvesting;
            };
        } else {
            upGrader.upgradeController(target);
            upGrader.memory.workStatus = WorkingStatus.upgradeing;
        }
    }
}

export function upGraderWork(creep: Creep) {
    work(creep, upGrader(creep));
}

export function build(builder: Creep, buildTask: Task) {
    return () => {
        const target = Game.constructionSites[buildTask.targetId];
        const result = builder.build(target);
        builder.say('building' + result);
        if(result == ERR_NOT_IN_RANGE) {
            builder.moveTo(target);
        } else if (builder.memory.workStatus === WorkingStatus.building && result === ERR_NOT_ENOUGH_ENERGY) {
            builder.memory.workStatus = WorkingStatus.harvesting;
        } else {
            builder.build(target);
            builder.memory.workStatus = WorkingStatus.building;
        }
    }
}

export function buildWork(builder: Creep, buildTask: Task) {
    work(builder, build(builder, buildTask));
}

export function repair(repairer: Creep, repairTask: Task) {
    return () => {
        const target = Object.values(Game.rooms)[0].find(FIND_STRUCTURES).filter(stru => stru.id === repairTask.targetId)[0];
        const result = repairer.repair(target);
        repairer.say(result.toString());
        if(result == ERR_NOT_IN_RANGE) {
            repairer.moveTo(target);
        } else if (repairer.memory.workStatus === WorkingStatus.repairing) {
            if (repairer.repair(target) === ERR_NOT_ENOUGH_ENERGY) {
                repairer.memory.workStatus = WorkingStatus.harvesting;
            };
        } else {
            repairer.repair(target);
            repairer.memory.workStatus = WorkingStatus.repairing;
        }
    }
}

export function repairWork(repairer: Creep, repairTask: Task) {
    work(repairer, repair(repairer, repairTask));
}

export function harverstWork(creep: Creep) {
    
}
