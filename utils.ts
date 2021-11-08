import { sourceGlobal } from './source';
import { structureGlobal } from './structure';
import { updateCreepsList, enemyList } from "./creepsList";
import { room } from './room';


export function updateGlobalAtLoop() {
    sourceGlobal.updateSourceList();
    structureGlobal.updateStructuresList();
    room.updateRoom();
    enemyList.updateEnemysList();

    updateCreepsList();
}
