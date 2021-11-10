import { structureGlobal } from "structure";
import { checkAllCHits, isDanger } from "./checkConstructor";
import TaskList, { TaskAction } from './task';

export function repair(creep: Creep, target) {

}

const golHtx = 3 / 4;

export function checkRepairTask() {
  const hitsDanger = checkAllCHits();
  if (hitsDanger.length) {
    const list = hitsDanger.sort((struA, struB) => struA.currPercent - struB.currPercent);
    list.forEach(target => {
      const id = target.structure.id;
      TaskList.addTask({
        action: TaskAction.repair,
        targetId: id,
        couldCancel: () => !isDanger(structureGlobal.findStructureById(id), golHtx),
      });
    });
  }
}
