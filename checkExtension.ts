import { checkAllEnergy, isFull } from "./checkConstructor";
import TaskList, { TaskAction } from './task';
import { structureGlobal } from './structure';

export function repair(creep: Creep, target) {

}

const golHtx = 3 / 4;

export function checkRepairTask() {
  const freeList = checkAllEnergy([STRUCTURE_SPAWN, STRUCTURE_EXTENSION]);
  if (freeList.length) {
    const first = freeList.sort((struA, struB) => struA.free - struB.free)[0];
    const id = first.structure.id;
    // 派发需要治疗的任务
    TaskList.addTask({
      action: TaskAction.repair,
      targetId: id,
      // todo 找不到原因，先判断是不是target 不存在了，但是 repair 任务还没有取消
      couldCancel: () => !isFull(structureGlobal.findStructureById(id) as any),
    });
  }
}
