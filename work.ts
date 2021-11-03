import TaskList, { Task, TaskAction, WorkingStatus } from './task';
import sourceTable, { sourceGlobal } from './source';
import { room } from './room';

export function getEnerge(creep: Creep, target: Source | StructureContainer) {
    if ((target as StructureContainer).structureType) {
        return creep.withdraw((target as StructureContainer), RESOURCE_ENERGY);
    } else {
        return creep.harvest((target as Source))
    }
}


export function work(creep: Creep, workFn: () => void) {
    const source = sourceTable.findSourceAble(creep);
    sourceTable.markCreep(creep, source.id);
    creep.say(creep.store.energy.toString())
    creep.say(creep.memory.workStatus)
    
    if(creep.store.energy == 0 && getEnerge(creep, source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
        creep.memory.workStatus = WorkingStatus.harvesting
    } else if (creep.memory.workStatus === WorkingStatus.harvesting && creep.store.energy < creep.store.getCapacity()) {
        const result = getEnerge(creep, source);
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
        const target = room.find(FIND_STRUCTURES).filter(stru => stru.id === repairTask.targetId)[0];
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

export function harverst(harverster: Creep, harverstTask: Task) {
    const source = room.find(FIND_SOURCES).find(sou => sou.id === harverstTask.targetId);
    const container = source.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: stru => stru.structureType === STRUCTURE_CONTAINER
    });
    if (harverster.pos.isEqualTo(container)) {
        harverster.harvest(source);
    } else {
        const result = harverster.moveTo(container);
    }
}

export function harverstWork(creep: Creep, harverstTask: Task) {
    harverstTask.currentWorkerName = creep.name;
    harverst(creep, harverstTask);
}
