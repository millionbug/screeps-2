export let room = {
    instance: Object.values(Game.rooms)[0],
    updateRoom() {
        this.instance = Object.values(Game.rooms)[0];
    }
};
