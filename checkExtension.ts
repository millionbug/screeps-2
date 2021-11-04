import { checkAllEnergy, isFull } from "./checkConstructor";
import TaskList, { TaskAction } from './task';
import { structureGlobal } from './structure';
import CreepsList from "./creepsList";


export function repair(creep: Creep, target) {

}

const golHtx = 3 / 4;

export function checkTransferTask() {
  const freeList = checkAllEnergy([STRUCTURE_SPAWN, STRUCTURE_EXTENSION]);
  const { creepsNumb } = CreepsList;
  if (freeList.length) {
    const first = freeList.sort((struA, struB) => struA.free - struB.free)[0];
    const id = first.structure.id;
    // 派发需要治疗的任务
    TaskList.addTask({
      action: TaskAction.transfer,
      targetId: id,
    // 总数小于 16 时取消 transfer
      couldCancel: () => !isFull(structureGlobal.findStructureById(id) as any) || creepsNumb > 16,
    });
  }
}
