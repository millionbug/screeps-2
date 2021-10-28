export function findStructureByType(structureType: BuildableStructureConstant) {
    const room = Object.values(Game.rooms)[0];
    return room.find(FIND_STRUCTURES).filter(stru => stru.structureType === structureType);
}
