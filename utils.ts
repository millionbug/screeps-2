import { room } from "./source";

export function findStructureByType(structureType: BuildableStructureConstant) {
    return room.find(FIND_STRUCTURES).filter(stru => stru.structureType === structureType);
}
