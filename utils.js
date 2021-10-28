"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStructureByType = void 0;
function findStructureByType(structureType) {
    const room = Object.values(Game.rooms)[0];
    return room.find(FIND_STRUCTURES).filter(stru => stru.structureType === structureType);
}
exports.findStructureByType = findStructureByType;
