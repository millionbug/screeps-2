import TaskList, { TaskAction, WorkingStatus } from './task';
import CreepsList from './creepsList';
import { room } from './room';

let index = 0;

 enum COST {move_cost = 50,
  work_cost = 100,
  attack_cost = 80,
  ranged_attack_cost = 150,
  tough_cost = 10,
  heal_cost = 250,
  claim_cost = 600,
  carry_cost = 50}


  function formatBodyWithEnergy(body: BodyPartConstant[], account: number) {
    // 每个 body 部件消耗 50
    account = account - 100;
    body.forEach(part => {
        account -= COST[part + '_cost'];
    })
    let neoBody = [];
    let index = 0;
    let min = 0;
    while (account >= min) {
        var curr = body[index];
        console.log(body, index)
        var currNeed = COST[curr + '_cost'];
        if (min === 0 || min > currNeed) {
            min = currNeed;
        }
        if ((account - currNeed) >= 0) {
            account = account - currNeed;
            neoBody.push(curr);
        }
        index = (index + 1) % body.length;
        console.log('account', account, curr, min, neoBody, currNeed)
    }
    return neoBody;
}


function Create(actionType: TaskAction, createOptions?: {
    body: BodyPartConstant[]
}) {
    const spawn = room.instance.find(FIND_MY_SPAWNS)[0];
    const energyAvailable = room.instance.energyAvailable;
    // console.log('energyAvailable', energyAvailable)
    const name = (index++).toString();
    // const body = formatBodyWithEnergy(createOptions?.body || [WORK, MOVE, CARRY], energyAvailable);
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
    const { repairers, builders, upGraders, harversters, transfers, attackers } = CreepsList;
    const repairTask = TaskList.list.find(task => task.action === TaskAction.repair);
    const buildTask = TaskList.list.find(task => task.action === TaskAction.build);
    const upGradeTask = TaskList.list.find(task => task.action === TaskAction.upgrade);
    const harverstTasks = TaskList.list.filter(task => task.action === TaskAction.harvest);
    const transferTask = TaskList.list.find(task => task.action === TaskAction.transfer);
    const attackTask = TaskList.list.find(task => task.action === TaskAction.attack);

    // transfer 任务例外，否则永远停不下来
    if (transferTask && transfers.length < 6) {
        Create(TaskAction.transfer);
    }

    if (attackTask && attackers.length < 3) {
        Create(TaskAction.attack, {
            body: [ATTACK, ATTACK, MOVE]
        });
    }

    if (repairers.length < 2 && repairTask) {
        Create(TaskAction.repair);
    }
    if (builders.length < 4 && buildTask) {
        Create(TaskAction.build);
    }
    if (upGraders.length < 8) {
        Create(TaskAction.upgrade);
    }

    if (harverstTasks.length > harversters.length) {
        createHaverster();
    }
}
