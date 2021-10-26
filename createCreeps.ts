import TaskList, { TaskAction, WorkingStatus } from './task';
import CreepsList from './creepsList';
let index = 0;

function Create(actionType: TaskAction) {
    // find the first or 0th spawn in the room
    let spawn = Object.values(Game.rooms)[0].find(FIND_MY_SPAWNS)[0];
    let result = spawn.spawnCreep([WORK, MOVE, CARRY], (index++).toString(), {memory: {
        action: actionType,
        workStatus: WorkingStatus.relaxing
    }});
}

export function createCreeps() {
    const { repairers, builders, upGraders } = CreepsList;
    const repairTask = TaskList.list.find(task => task.action === TaskAction.repair);
    const buildTask = TaskList.list.find(task => task.action === TaskAction.repair);
    const upGradeTask = TaskList.list.find(task => task.action === TaskAction.repair);

    if (repairers.length < 2 && repairTask) {
        Create(TaskAction.repair);
    }
    if (builders.length < 2 && buildTask) {
        Create(TaskAction.build);
    }
    if (upGraders.length < 2) {
        Create(TaskAction.upgrade);
    }
}