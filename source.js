"use strict";
// export const sourceMap = [
//     {
//         id: '13ef4cc9a1bcf19a7ed2697a',
//         maxSeat: 3
//     }, {
//         id: 'efcf9c214c5293821999807b',
//         maxSeat: 3
//     }, {
//         id: '398a2122e8c5617119a90190',
//         maxSeat: 3
//     }
// ];
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceMap = exports.room = void 0;
exports.room = Object.values(Game.rooms)[0];
exports.sourceMap = Object.values(Game.rooms)[0].find(FIND_SOURCES).map(source => {
    return {
        id: source.id,
        maxSeat: 3,
        type: 'source'
    };
});
class sourceTable {
    constructor() {
        this.harvesterMap = {};
        this.containerMap = [];
    }
    sourceCheck() {
        const containers = exports.room.find(FIND_STRUCTURES).filter(stru => stru.structureType === STRUCTURE_CONTAINER);
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
        exports.sourceMap.concat(this.containerMap).forEach(sMap => {
            const creepList = (this[sMap.id] || []);
            if (creepList.length) {
                this[sMap.id] = creepList.filter(creep => { var _a; return (_a = Game.creeps[creep]) === null || _a === void 0 ? void 0 : _a.id; });
                console.log(sMap.id, this[sMap.id]);
            }
        });
    }
    findSourceAble(creep) {
        // let energySource: EnergySource[];
        // if (creep.memory.action === TaskAction.harvest) {
        // }
        const sources = creep.room.find(FIND_SOURCES);
        const high = exports.sourceMap.find(file => {
            if (!this[file.id]) {
                this[file.id] = [];
            }
            return this[file.id].includes(creep.name) && sources.find(s => s.id === file.id).energy > 0;
        });
        if (high) {
            return sources.find(s => s.id === high.id);
        }
        const middle = exports.sourceMap.find(sourceFile => {
            var _a;
            const id = sourceFile.id;
            const sIn = sources.find(s => s.id === id);
            const seat = (((_a = this[id]) === null || _a === void 0 ? void 0 : _a.length) || 0) < sourceFile.maxSeat;
            if (seat) {
                return sIn.energy > 0;
            }
        });
        if (middle) {
            return sources.find(s => s.id === middle.id);
        }
        return sources[0];
    }
    findSourceWithCreepType(creep) {
        if (creep.memory.action === TaskAction.harvest) {
            return this.findSourceAble(creep);
        }
        const containers = exports.room.find(FIND_STRUCTURES).filter(stru => stru.structureType === STRUCTURE_CONTAINER);
        if (containers.length) {
            containers.find(con => {
            });
        }
    }
}
const table = new sourceTable();
exports.default = table;
