import { structureGlobal } from "./structure";

const DangerHits = 1 / 3;

export function isDanger(structure: Structure<StructureConstant>, gol?: number) {
    const maxHits = structure.hitsMax;
    const hits = structure.hits;
    const currPercent = hits / maxHits;
    return currPercent < (gol || DangerHits) ? currPercent : false;
}

export function isFull(structure: StructureSpawn | StructureExtension) {
    const free = structure.store.getFreeCapacity();
    return free;
}

export function checkAllCHits() {
    const structures = structureGlobal.findStructureByType(STRUCTURE_ROAD).concat(findStructureByType(STRUCTURE_CONTAINER));
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
    const structures = structureTypes.flatMap(type => {
        return structureGlobal.findStructureByType(type);
    })
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
