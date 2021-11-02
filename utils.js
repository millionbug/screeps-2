"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStructureByType = void 0;
const room_1 = require("./room");
function findStructureByType(structureType, options) {
    return room_1.room.find(FIND_STRUCTURES, options).filter(stru => stru.structureType === structureType);
}
exports.findStructureByType = findStructureByType;
