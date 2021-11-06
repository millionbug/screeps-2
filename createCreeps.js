"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCreeps = void 0;
const task_1 = require("./task");
const creepsList_1 = require("./creepsList");
const room_1 = require("./room");
let index = 0;
var COST;
(function (COST) {
    COST[COST["move_cost"] = 50] = "move_cost";
    COST[COST["work_cost"] = 100] = "work_cost";
    COST[COST["attack_cost"] = 80] = "attack_cost";
    COST[COST["ranged_attack_cost"] = 150] = "ranged_attack_cost";
    COST[COST["tough_cost"] = 10] = "tough_cost";
    COST[COST["heal_cost"] = 250] = "heal_cost";
    COST[COST["claim_cost"] = 600] = "claim_cost";
    COST[COST["carry_cost"] = 50] = "carry_cost";
})(COST || (COST = {}));
function formatBodyWithEnergy(body, account) {
    // 每个 body 部件消耗 50
    account = account - 100;
    body.forEach(part => {
        account -= COST[part + '_cost'];
    });
    let neoBody = [];
    let index = 0;
    let min = 0;
    while (account >= min) {
        var curr = body[index];
        console.log(body, index);
        var currNeed = COST[curr + '_cost'];
        if (min === 0 || min > currNeed) {
            min = currNeed;
        }
        if ((account - currNeed) >= 0) {
            account = account - currNeed;
            neoBody.push(curr);
        }
        index = (index + 1) % body.length;
        console.log('account', account, curr, min, neoBody, currNeed);
    }
    return neoBody;
}
function Create(actionType, createOptions) {
    const spawn = room_1.room.instance.find(FIND_MY_SPAWNS)[0];
    const energyAvailable = room_1.room.instance.energyAvailable;
    // console.log('energyAvailable', energyAvailable)
    const name = (index++).toString();
    // const body = formatBodyWithEnergy(createOptions?.body || [WORK, MOVE, CARRY], energyAvailable);
    const body = (createOptions === null || createOptions === void 0 ? void 0 : createOptions.body) || [WORK, MOVE, CARRY];
    let result = spawn && spawn.spawnCreep(body, name, { memory: {
            action: actionType,
            workStatus: task_1.WorkingStatus.relaxing
        } });
}
function createHaverster() {
    Create(task_1.TaskAction.harvest, {
        body: [WORK, WORK, MOVE]
    });
}
function createCreeps() {
    const { repairers, builders, upGraders, harversters, transfers } = creepsList_1.default;
    const repairTask = task_1.default.list.find(task => task.action === task_1.TaskAction.repair);
    const buildTask = task_1.default.list.find(task => task.action === task_1.TaskAction.build);
    const upGradeTask = task_1.default.list.find(task => task.action === task_1.TaskAction.upgrade);
    const harverstTasks = task_1.default.list.filter(task => task.action === task_1.TaskAction.harvest);
    const transferTask = task_1.default.list.find(task => task.action === task_1.TaskAction.transfer);
    // transfer 任务例外，否则永远停不下来
    if (transferTask && transfers.length < 6) {
        Create(task_1.TaskAction.transfer);
    }
    if (repairers.length < 2 && repairTask) {
        Create(task_1.TaskAction.repair);
    }
    if (builders.length < 4 && buildTask) {
        Create(task_1.TaskAction.build);
    }
    if (upGraders.length < 8) {
        Create(task_1.TaskAction.upgrade);
    }
    if (harverstTasks.length > harversters.length) {
        createHaverster();
    }
}
exports.createCreeps = createCreeps;
