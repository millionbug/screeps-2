import { room } from './source';
import TaskList, { TaskAction } from './task';

export function checkHarverstTask() {
  const sourceList = room.find(FIND_SOURCES);
  if (sourceList.length) {
    sourceList.forEach(source => {
      if (!TaskList.list.find(item => item.targetId === source.id)) {
        TaskList.addTask({
          action: TaskAction.harvest,
          targetId: source.id,
          couldCancel: () => {
            return !source || !source.energy;
          },
        });
      }
    });
  }
}
