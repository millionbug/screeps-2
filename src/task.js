"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAction = void 0;
var TaskAction;
(function (TaskAction) {
    TaskAction["repair"] = "repair";
    TaskAction["create"] = "create";
    TaskAction["harvest"] = "harvest";
    TaskAction["build"] = "build";
    TaskAction["upgrade"] = "upgrade";
})(TaskAction = exports.TaskAction || (exports.TaskAction = {}));
class TaskMemory {
    constructor() {
        this.list = [];
    }
    addTask(task) {
        this.list.push(task);
    }
    checkList() {
        this.list = this.list.filter(task => {
            return !task.couldCancel();
        });
    }
}
exports.default = new TaskMemory();
