import { findStructureByType } from "utils";

const DangerHits = 1 / 3;

export function isDanger(structure: Structure<StructureConstant>, gol?: number) {
    const maxHits = structure.hitsMax;
    const hits = structure.hits;
    const currPercent = hits / maxHits;
    return currPercent < (gol || DangerHits) ? currPercent : false;
}

export function checkAllCHits() {
    const structures = findStructureByType(STRUCTURE_ROAD).concat(findStructureByType(STRUCTURE_CONTAINER));
    return Object.keys(structures).map((key, index) => {
        const structure = structures[key];
        const currPercent = isDanger(structure)
        if (currPercent) {
            return {
                structure,
                currPercent
            };
        }
    }).filter(Boolean);
}
