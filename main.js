"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkRepair_1 = require("./src/checkRepair");
const checkBuild_1 = require("./src/checkBuild");
const checkUpgrade_1 = require("@/checkUpgrade");
const goToWork_1 = require("@/goToWork");
const createCreeps_1 = require("@/createCreeps");
function loop() {
    (0, createCreeps_1.checkActive)();
    (0, checkRepair_1.checkRepairTask)();
    (0, checkBuild_1.checkBuildTask)();
    (0, checkUpgrade_1.checkUpgrade)();
    (0, goToWork_1.goToWork)();
}
exports.default = loop;
