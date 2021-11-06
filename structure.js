"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.structureGlobal = void 0;
const room_1 = require("./room");
class StructureGlobal {
    constructor() {
        this.cacheList = {};
    }
    updateStructuresList() {
        this.structuresList = room_1.room.instance.find(FIND_STRUCTURES);
        this.cacheList = {};
    }
    findStructureById(id) {
        return this.structuresList.find(stru => stru.id === id);
    }
    findStructureByType(structureType) {
        const list = this.structuresList.filter(stru => stru.structureType === structureType);
        if (!this.cacheList[structureType]) {
            this.cacheList[structureType] = list;
        }
        return list;
    }
}
exports.structureGlobal = new StructureGlobal();
