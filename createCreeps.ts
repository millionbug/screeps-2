import TaskList, { TaskAction, WorkingStatus } from './task';
import CreepsList from './creepsList';
import { room } from './room';

let index = 0;

function Create(actionType: TaskAction, createOptions?: {
    body: BodyPartConstant[]
}) {
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    const name = (index++).toString();
    const body = createOptions?.body || [WORK, MOVE, CARRY];
    let result = spawn && spawn.spawnCreep(body, name, {memory: {
        action: actionType,
        workStatus: WorkingStatus.relaxing
    }});
}

function createHaverster() {
    Create(TaskAction.harvest, {
        body: [WORK, WORK, MOVE]
    })
}

export function createCreeps() {
    const { repairers, builders, upGraders, harversters, transfers } = CreepsList;
    const repairTask = TaskList.list.find(task => task.action === TaskAction.repair);
    const buildTask = TaskList.list.find(task => task.action === TaskAction.build);
    const upGradeTask = TaskList.list.find(task => task.action === TaskAction.upgrade);
    const harverstTasks = TaskList.list.filter(task => task.action === TaskAction.harvest);
    const transferTask = TaskList.list.find(task => task.action === TaskAction.transfer);

    if (repairers.length < 2 && repairTask) {
        Create(TaskAction.repair);
    }
    if (builders.length < 4 && buildTask) {
        Create(TaskAction.build);
    }
    if (upGraders.length < 8) {
        Create(TaskAction.upgrade);
    }

    // transfer 任务例外，否则永远停不下来
    if (transferTask && transfers.length < 6) {
        Create(TaskAction.transfer);
    }

    if (harverstTasks.length > harversters.length) {
        createHaverster();
    }
}