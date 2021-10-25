"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loop = void 0;
const checkRepair_1 = require("./checkRepair");
const checkBuild_1 = require("./checkBuild");
const checkUpgrade_1 = require("./checkUpgrade");
const goToWork_1 = require("./goToWork");
const createCreeps_1 = require("./createCreeps");
function loop() {
    (0, createCreeps_1.checkActive)();
    (0, checkRepair_1.checkRepairTask)();
    (0, checkBuild_1.checkBuildTask)();
    (0, checkUpgrade_1.checkUpgrade)();
    (0, createCreeps_1.createCreeps)();
    (0, goToWork_1.goToWork)();
}
exports.loop = loop;
