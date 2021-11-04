"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAllEnergy = exports.checkAllCHits = exports.isFull = exports.isDanger = void 0;
const structure_1 = require("./structure");
const DangerHits = 1 / 3;
function isDanger(structure, gol) {
    const maxHits = structure.hitsMax;
    const hits = structure.hits;
    const currPercent = hits / maxHits;
    return currPercent < (gol || DangerHits) ? currPercent : false;
}
exports.isDanger = isDanger;
function isFull(structure) {
    const free = structure.store.getFreeCapacity(RESOURCE_ENERGY);
    return free;
}
exports.isFull = isFull;
function checkAllCHits() {
    const structures = structure_1.structureGlobal.findStructureByType(STRUCTURE_ROAD)
        .concat(structure_1.structureGlobal.findStructureByType(STRUCTURE_CONTAINER));
    return Object.keys(structures).map((key, index) => {
        const structure = structures[key];
        const currPercent = isDanger(structure);
        if (currPercent) {
            return {
                structure,
                currPercent
            };
        }
    }).filter(Boolean);
}
exports.checkAllCHits = checkAllCHits;
function checkAllEnergy(structureTypes) {
    const structures = structureTypes.reduce((pre, curr) => {
        return pre.concat(structure_1.structureGlobal.findStructureByType(curr));
    }, []);
    return structures.map((structure) => {
        // @ts-ignore
        const free = isFull(structure);
        if (free) {
            return {
                structure,
                free
            };
        }
    }).filter(Boolean);
}
exports.checkAllEnergy = checkAllEnergy;
