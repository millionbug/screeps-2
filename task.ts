export enum TaskAction {
    repair = 'repair',
    create = 'create',
    harvest = 'harvest',
    build = 'build',
    upgrade = 'upgrade',
    transfer = 'transfer',
    attack = 'attack'
}

export enum WorkingStatus {
    repairing = 'repairing',
    creating = 'creating',
    harvesting = 'harvesting',
    building = 'building',
    upgradeing = 'upgradeing',
    relaxing = 'relaxing',
    transfering = 'transfering',
    attacking = 'attacking'
}

export interface Task {
    action: TaskAction;
    targetId: string;
    currentWorkerName?: string;
    couldCancel: () => boolean;
}

class TaskMemory {
    list: Task[] = [];

    addTask(task: Task) {
        this.list.push(task)
    }

    checkList() {
        this.list = this.list.filter(task => {
            const result = task.couldCancel();
            return !result;
        })
    }
}

export default new TaskMemory();