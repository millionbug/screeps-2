"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAllCHits = exports.isDanger = void 0;
const utils_1 = require("utils");
const DangerHits = 1 / 3;
function isDanger(structure, gol) {
    const maxHits = structure.hitsMax;
    const hits = structure.hits;
    const currPercent = hits / maxHits;
    return currPercent < (gol || DangerHits) ? currPercent : false;
}
exports.isDanger = isDanger;
function checkAllCHits() {
    const structures = (0, utils_1.findStructureByType)(STRUCTURE_ROAD);
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
