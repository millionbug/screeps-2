"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.room = void 0;
exports.room = {
    instance: Object.values(Game.rooms)[0],
    updateRoom() {
        this.instance = Object.values(Game.rooms)[0];
    }
};
