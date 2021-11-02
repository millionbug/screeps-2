"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loop = void 0;
const checkRepair_1 = require("./checkRepair");
const checkBuild_1 = require("./checkBuild");
const checkUpgrade_1 = require("./checkUpgrade");
const goToWork_1 = require("./goToWork");
const createCreeps_1 = require("./createCreeps");
const task_1 = require("./task");
const creepsList_1 = require("./creepsList");
const checkHarverst_1 = require("./checkHarverst");
function loop() {
    // 检查 creeps 
    (0, creepsList_1.updateCreepsList)();
    task_1.default.checkList();
    (0, checkHarverst_1.checkHarverstTask)();
    (0, checkRepair_1.checkRepairTask)();
    (0, checkBuild_1.checkBuildTask)();
    (0, checkUpgrade_1.checkUpgrade)();
    (0, createCreeps_1.createCreeps)();
    (0, goToWork_1.goToWork)();
}
exports.loop = loop;
