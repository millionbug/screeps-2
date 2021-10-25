import TaskList, { TaskAction } from './task';

export function checkUpgrade() {
    if (!TaskList.list.length) {
        TaskList.addTask({
            action: TaskAction.upgrade,
            targetId: Game.rooms[0].controller.id,
            couldCancel: () => {
                return Boolean(TaskList.list.length);
            }
        })
    }
}