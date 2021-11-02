import { room } from "./room";

export function findStructureByType(structureType: BuildableStructureConstant, options?: FilterOptions<FIND_STRUCTURES>) {
    return room.find(FIND_STRUCTURES, options).filter(stru => stru.structureType === structureType);
}
