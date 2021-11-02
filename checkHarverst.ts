import { room } from './room';
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
            if (source?.energy) {
                const container = source.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: stru => stru.structureType === STRUCTURE_CONTAINER
                }) as unknown as StructureContainer;
                console.log('container.store.energy === container.store.getCapacity()', container.store.energy, container.store.getCapacity())
                return !container || container.store.energy === container.store.getCapacity();
            }
            return !source || !source.energy;
          },
        });
      }
    });
  }
}
