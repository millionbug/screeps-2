"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAllCHits = exports.isDanger = void 0;
const DangerHits = 1 / 3;
function isDanger(structure) {
    const maxHits = structure.hitsMax;
    const hits = structure.hits;
    const currPercent = hits / maxHits;
    return currPercent > DangerHits ? currPercent : false;
}
exports.isDanger = isDanger;
function checkAllCHits() {
    const structures = Game.structures;
    return Object.keys(structures).map((key) => {
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
