import { checkAllCHits, isDanger } from "./checkConstructor";
import TaskList, { TaskAction } from './task';

export function repair(creep: Creep, target) {

}

export function checkRepairTask() {
  const hitsDanger = checkAllCHits();
  if (hitsDanger.length) {
    const first = hitsDanger.sort((struA, struB) => struA.currPercent - struB.currPercent)[0];
    // 派发需要治疗的任务
    TaskList.addTask({
      action: TaskAction.repair,
      targetId: first.structure.id,
      couldCancel: () => !isDanger(first.structure),
    });
  }
}
