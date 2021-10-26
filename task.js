"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkingStatus = exports.TaskAction = void 0;
var TaskAction;
(function (TaskAction) {
    TaskAction["repair"] = "repair";
    TaskAction["create"] = "create";
    TaskAction["harvest"] = "harvest";
    TaskAction["build"] = "build";
    TaskAction["upgrade"] = "upgrade";
})(TaskAction = exports.TaskAction || (exports.TaskAction = {}));
var WorkingStatus;
(function (WorkingStatus) {
    WorkingStatus["repairing"] = "repairing";
    WorkingStatus["creating"] = "creating";
    WorkingStatus["harvesting"] = "harvesting";
    WorkingStatus["building"] = "building";
    WorkingStatus["upgradeing"] = "upgradeing";
    WorkingStatus["relaxing"] = "relaxing";
})(WorkingStatus = exports.WorkingStatus || (exports.WorkingStatus = {}));
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
