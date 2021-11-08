import { checkAllCHits, isDanger } from "./checkConstructor";
import TaskList, { TaskAction } from './task';
import { enemyList } from './creepsList';



const golHtx = 3 / 4;

export function checkAttackTask() {

  const enemys = enemyList.list;

  if (enemys.length) {
    const id = enemys[0]?.id;
    // 派发需要治疗的任务
    TaskList.addTask({
      action: TaskAction.attack,
      targetId: id,
      couldCancel: () => {
        return !enemyList.getEnemy(id);
      }
    });
  }
}
