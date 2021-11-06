import { room } from './room';
import TaskList, { TaskAction } from './task';

export function checkBuildTask() {
    const buildList = room.instance.find(FIND_CONSTRUCTION_SITES);
    if (buildList.length) {
        const target = buildList[0];
        const id = target.id;
        TaskList.addTask({
            action: TaskAction.build,
            targetId: id,
            couldCancel: () => {
                const currentT = Game.constructionSites[id];
                return !currentT || (currentT.progressTotal === currentT.progress);
            }
        })
    }
}

