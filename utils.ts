import { sourceGlobal } from './source';
import { structureGlobal } from './structure';
import { updateCreepsList } from "./creepsList";
import { room } from './room';


export function updateGlobalAtLoop() {
    sourceGlobal.updateSourceList();
    structureGlobal.updateStructuresList();
    room.updateRoom();

    updateCreepsList();
}
