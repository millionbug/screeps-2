import { room } from './source';
import TaskList, { TaskAction } from './task';

export function checkUpgrade() {
    if (!TaskList.list.length) {
        TaskList.addTask({
            action: TaskAction.upgrade,
            targetId: room.controller.id,
            couldCancel: () => {
                return Boolean(TaskList.list.length > 1);
            }
        });
        return;
    }

    if (room.controller.ticksToDowngrade < 9000) {
        TaskList.addTask({
            action: TaskAction.upgrade,
            targetId: room.controller.id,
            couldCancel: () => {
                return room.controller.ticksToDowngrade > 10000;
            }
        })
    }
}