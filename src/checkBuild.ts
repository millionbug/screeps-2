import TaskList, { TaskAction } from './task';

export function checkBuildTask() {
    const room = Game.rooms[Object.keys(Game.rooms)[0]]
    const buildList = room.find(FIND_CONSTRUCTION_SITES);
    if (buildList.length) {
        const target = buildList[0];
        TaskList.addTask({
            action: TaskAction.build,
            targetId: target.id,
            couldCancel: () => {
                return target.progressTotal === target.progress;
            }
        })
    }
}

