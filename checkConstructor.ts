import { findStructureByType } from "utils";

const DangerHits = 1 / 3;

export function isDanger(structure: Structure<StructureConstant>) {
    const maxHits = structure.hitsMax;
    const hits = structure.hits;
    const currPercent = hits / maxHits;
    return currPercent < DangerHits ? currPercent : false;
}

export function checkAllCHits() {
    const structures = findStructureByType(STRUCTURE_ROAD);
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
