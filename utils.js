"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGlobalAtLoop = void 0;
const source_1 = require("./source");
const structure_1 = require("./structure");
const creepsList_1 = require("./creepsList");
const room_1 = require("./room");
function updateGlobalAtLoop() {
    source_1.sourceGlobal.updateSourceList();
    structure_1.structureGlobal.updateStructuresList();
    room_1.room.updateRoom();
    creepsList_1.enemyList.updateEnemysList();
    (0, creepsList_1.updateCreepsList)();
}
exports.updateGlobalAtLoop = updateGlobalAtLoop;
