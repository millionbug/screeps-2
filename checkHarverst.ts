import { room } from './room';
import TaskList, { TaskAction } from './task';
import { sourceGlobal } from './source';

export function checkHarverstTask() {
  if (sourceGlobal.sourcesList.length) {
    sourceGlobal.sourcesList.forEach(source => {
      const container = source.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: stru => {
          return stru.structureType === STRUCTURE_CONTAINER && source.pos.x - stru.pos.x < 3; 
        }
      }) as unknown as StructureContainer;
      if (container && !TaskList.list.find(item => item.targetId === source.id)) {
        TaskList.addTask({
          action: TaskAction.harvest,
          targetId: source.id,
          couldCancel: () => {
            if (source?.energy) {
                const container = source.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: stru => stru.structureType === STRUCTURE_CONTAINER
                }) as unknown as StructureContainer;
                return !container || container?.store.energy === container?.store.getCapacity();
            }
            return !source || !source.energy;
          },
        });
      }
    });
  }
}
