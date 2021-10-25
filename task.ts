export enum TaskAction {
    repair = 'repair',
    create = 'create',
    harvest = 'harvest',
    build = 'build',
    upgrade = 'upgrade'
}
export interface Task {
    action: TaskAction;
    targetId: string;
    couldCancel: () => boolean;
}

class TaskMemory {
    list: Task[] = [];

    addTask(task: Task) {
        this.list.push(task)
    }

    checkList() {
        this.list = this.list.filter(task => {
            return !task.couldCancel();
        })
    }
}

export default new TaskMemory();