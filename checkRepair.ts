import { checkAllCHits, isDanger } from "./checkConstructor";
import TaskList, { TaskAction } from './task';

export function repair(creep: Creep, target) {

}

const golHtx = 3 / 4;

export function checkRepairTask() {
  const hitsDanger = checkAllCHits();
  if (hitsDanger.length) {
    const first = hitsDanger.sort((struA, struB) => struA.currPercent - struB.currPercent)[0];
    const id = first.structure.id;
    // 派发需要治疗的任务
    TaskList.addTask({
      action: TaskAction.repair,
      targetId: id,
      // todo 找不到原因，先判断是不是target 不存在了，但是 repair 任务还没有取消
      couldCancel: () => !isDanger(Game.getObjectById(id) as any, golHtx),
    });
  }
}
