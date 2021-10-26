"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceMap = void 0;
exports.sourceMap = [
    {
        id: '13ef4cc9a1bcf19a7ed2697a',
        maxSeat: 3
    }, {
        id: 'efcf9c214c5293821999807b',
        maxSeat: 3
    }, {
        id: '398a2122e8c5617119a90190',
        maxSeat: 3
    }
];
class sourceTable {
    markCreep(creep, sourceId) {
        if (!this[sourceId]) {
            this[sourceId] = [];
        }
        this[sourceId].push(creep.name);
    }
    findSourceAble(creep) {
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
}
const table = new sourceTable();
exports.default = table;
