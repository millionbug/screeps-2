import { structureGlobal } from './structure';
import { room } from './room';
export interface EnergySource {
    id: string;
    maxSeat: number;
    type: 'source' | 'container'
}

export const SourceMap: EnergySource[] = Object.values(Game.rooms)[0].find(FIND_SOURCES).map(source => {
    return {
        id: source.id,
        maxSeat: 3,
        type: 'source'
    }
});

class SourceGlobal {
    sourcesList: Source[];

    constructor() {
        this.updateSourceList();
    }

    updateSourceList() {
        this.sourcesList = room.instance.find(FIND_SOURCES);
    }

    getSourceTarget(id: string): Source | StructureContainer {
        const containers = structureGlobal.findStructureByType(STRUCTURE_CONTAINER);
        return this.sourcesList.find(s => s.id === id) || containers.find(con => con.id === id);
    }
};

export const sourceGlobal = new SourceGlobal();


class sourceTable {

    harvesterMap = {};

    containerMap: EnergySource[] = [];

    sourceCheck() {
        const containers = structureGlobal.findStructureByType(STRUCTURE_CONTAINER);
        containers.forEach(con => {
            if (!this[con.id]) {
                this[con.id] = [];
            }
        });
    }

    markCreep(creep: Creep, sourceId: string) {
        if (!this[sourceId]) {
            this[sourceId] = [];
        }
        if (this[sourceId].includes(creep.name)) {
            return;
        }
        this[sourceId].push(creep.name);
    }

    checkCreepActive() {
        SourceMap.concat(this.containerMap).forEach(sMap => {
            const creepList = (this[sMap.id] || []) as string[];
            if (creepList.length) {
                this[sMap.id] = creepList.filter(creep => Game.creeps[creep]?.id);
            }
        })
    }

    findSourceAble(creep: Creep): Source | StructureContainer {

        this.containerMap = structureGlobal.findStructureByType(STRUCTURE_CONTAINER).map(container => {
            return {
                id: container.id,
                maxSeat: 5,
                type: 'container'
            }
        });

        const sourceMap = this.containerMap.concat(SourceMap).map(file => {
            if (!this[file.id]) {
                this[file.id] = [];
            }
            return sourceGlobal.getSourceTarget(file.id);
        });

        const high = sourceMap.find(sou => {
            if (this[sou.id].includes(creep.name)) {
                return (sou as Source).energy || (sou as StructureContainer).store.energy;
            }
        });
        if (high) {
            return high;
        }

        const middle = this.containerMap.concat(SourceMap).find(sourceFile => {
            const id = sourceFile.id;

            const seat = (this[id]?.length || 0) < sourceFile.maxSeat;
            if (seat) {
                const sou = sourceGlobal.getSourceTarget(id);
                return (sou as Source).energy || (sou as StructureContainer).store.energy;
            }
        });

        if (middle) {
            return sourceGlobal.getSourceTarget(middle.id);
        }

        return sourceGlobal.sourcesList[0];
    }

    findSourceWithCreepType(creep: Creep): Source | StructureContainer {

        if (creep.memory.action === TaskAction.harvest) {
            return this.findSourceAble(creep);
        }

        const containers = structureGlobal.findStructureByType(STRUCTURE_CONTAINER);
        if (containers.length) {
            containers.find(con => {

            })
        }
    }
}

const table = new sourceTable();
export default table;

