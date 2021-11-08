"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loop = void 0;
const checkRepair_1 = require("./checkRepair");
const checkBuild_1 = require("./checkBuild");
const checkUpgrade_1 = require("./checkUpgrade");
const goToWork_1 = require("./goToWork");
const createCreeps_1 = require("./createCreeps");
const task_1 = require("./task");
const checkHarverst_1 = require("./checkHarverst");
const checkExtension_1 = require("./checkExtension");
const utils_1 = require("./utils");
const checkHostile_1 = require("./checkHostile");
function loop() {
    // 检查所有的资源
    (0, utils_1.updateGlobalAtLoop)();
    task_1.default.checkList();
    (0, checkHostile_1.checkAttackTask)();
    (0, checkHarverst_1.checkHarverstTask)();
    (0, checkRepair_1.checkRepairTask)();
    (0, checkBuild_1.checkBuildTask)();
    (0, checkExtension_1.checkTransferTask)();
    (0, checkUpgrade_1.checkUpgrade)();
    (0, createCreeps_1.createCreeps)();
    (0, goToWork_1.goToWork)();
}
exports.loop = loop;
