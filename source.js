"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceGlobal = exports.SourceMap = void 0;
const structure_1 = require("./structure");
const room_1 = require("./room");
exports.SourceMap = Object.values(Game.rooms)[0].find(FIND_SOURCES).map(source => {
    return {
        id: source.id,
        maxSeat: 3,
        type: 'source'
    };
});
class SourceGlobal {
    constructor() {
        this.updateSourceList();
    }
    updateSourceList() {
        this.sourcesList = room_1.room.instance.find(FIND_SOURCES);
    }
    getSourceTarget(id) {
        const containers = structure_1.structureGlobal.findStructureByType(STRUCTURE_CONTAINER);
        return this.sourcesList.find(s => s.id === id) || containers.find(con => con.id === id);
    }
}
;
exports.sourceGlobal = new SourceGlobal();
class sourceTable {
    constructor() {
        this.harvesterMap = {};
        this.containerMap = [];
    }
    sourceCheck() {
        const containers = structure_1.structureGlobal.findStructureByType(STRUCTURE_CONTAINER);
        containers.forEach(con => {
            if (!this[con.id]) {
                this[con.id] = [];
            }
        });
    }
    markCreep(creep, sourceId) {
        if (!this[sourceId]) {
            this[sourceId] = [];
        }
        if (this[sourceId].includes(creep.name)) {
            return;
        }
        this[sourceId].push(creep.name);
    }
    checkCreepActive() {
        exports.SourceMap.concat(this.containerMap).forEach(sMap => {
            const creepList = (this[sMap.id] || []);
            if (creepList.length) {
                this[sMap.id] = creepList.filter(creep => { var _a; return (_a = Game.creeps[creep]) === null || _a === void 0 ? void 0 : _a.id; });
            }
        });
    }
    findSourceAble(creep) {
        this.containerMap = structure_1.structureGlobal.findStructureByType(STRUCTURE_CONTAINER).map(container => {
            return {
                id: container.id,
                maxSeat: 5,
                type: 'container'
            };
        });
        const sourceMap = this.containerMap.concat(exports.SourceMap).map(file => {
            if (!this[file.id]) {
                this[file.id] = [];
            }
            return exports.sourceGlobal.getSourceTarget(file.id);
        });
        const high = sourceMap.find(sou => {
            if (this[sou.id].includes(creep.name)) {
                return sou.energy || sou.store.energy;
            }
        });
        if (high) {
            return high;
        }
        const middle = this.containerMap.concat(exports.SourceMap).find(sourceFile => {
            var _a;
            const id = sourceFile.id;
            const seat = (((_a = this[id]) === null || _a === void 0 ? void 0 : _a.length) || 0) < sourceFile.maxSeat;
            if (seat) {
                const sou = exports.sourceGlobal.getSourceTarget(id);
                return sou.energy || sou.store.energy;
            }
        });
        if (middle) {
            return exports.sourceGlobal.getSourceTarget(middle.id);
        }
        return exports.sourceGlobal.sourcesList[0];
    }
    findSourceWithCreepType(creep) {
        if (creep.memory.action === TaskAction.harvest) {
            return this.findSourceAble(creep);
        }
        const containers = structure_1.structureGlobal.findStructureByType(STRUCTURE_CONTAINER);
        if (containers.length) {
            containers.find(con => {
            });
        }
    }
}
const table = new sourceTable();
exports.default = table;
