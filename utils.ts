import { sourceGlobal } from './source';
import { structureGlobal } from './structure';
import { updateCreepsList } from "./creepsList";

export function updateGlobalAtLoop() {
    sourceGlobal.updateSourceList();
    structureGlobal.updateStructuresList();

    updateCreepsList();
}
