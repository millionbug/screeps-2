import { room } from './room';
import TaskList, { TaskAction } from './task';

export function checkUpgrade() {
    const list = TaskList.list.filter(task => task.action !== TaskAction.harvest);
    // todo 非采集任务为空时
    if (!list.length) {
        TaskList.addTask({
            action: TaskAction.upgrade,
            targetId: room.instance.controller.id,
            couldCancel: () => {
                return Boolean(TaskList.list.length > 1);
            }
        });
        return;
    }

    if (room.instance.controller.ticksToDowngrade < 9000) {
        TaskList.addTask({
            action: TaskAction.upgrade,
            targetId: room.instance.controller.id,
            couldCancel: () => {
                return room.instance.controller.ticksToDowngrade > 10000;
            }
        })
    }
}