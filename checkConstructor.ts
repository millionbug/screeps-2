import { structureGlobal } from "./structure";

const DangerHits = 1 / 3;

export function isDanger(structure: Structure<StructureConstant>, gol?: number) {
    if (!structure) {
        return false;
    }
    const maxHits = structure.hitsMax;
    const hits = structure.hits;
    const currPercent = hits / maxHits;
    return currPercent < (gol || DangerHits) ? currPercent : false;
}

export function isFull(structure: StructureSpawn | StructureExtension) {
    const free = structure.store.getFreeCapacity(RESOURCE_ENERGY);
    return free;
}

export function checkAllCHits() {
    const structures: Array<StructureRoad | StructureContainer> = structureGlobal.findStructureByType(STRUCTURE_ROAD)
    // @ts-ignore
    .concat(structureGlobal.findStructureByType(STRUCTURE_CONTAINER));
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

export function checkAllEnergy(structureTypes: Array<STRUCTURE_EXTENSION | STRUCTURE_SPAWN>) {
    const structures = structureTypes.reduce((pre, curr) => {
        return pre.concat(structureGlobal.findStructureByType(curr));
    }, [])
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
