import { room } from './source';
import TaskList, { TaskAction } from './task';

export function checkBuildTask() {
    const buildList = room.find(FIND_CONSTRUCTION_SITES);
    if (buildList.length) {
        const target = buildList[0];
        TaskList.addTask({
            action: TaskAction.build,
            targetId: target.id,
            couldCancel: () => {
                const currentT = Game.constructionSites[target.id];
                return !currentT || (currentT.progressTotal === currentT.progress);
            }
        })
    }
}

