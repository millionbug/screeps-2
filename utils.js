"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStructureByType = void 0;
const source_1 = require("./source");
function findStructureByType(structureType) {
    return source_1.room.find(FIND_STRUCTURES).filter(stru => stru.structureType === structureType);
}
exports.findStructureByType = findStructureByType;
