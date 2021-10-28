// export const sourceMap = [
//     {
//         id: '13ef4cc9a1bcf19a7ed2697a',
//         maxSeat: 3
//     }, {
//         id: 'efcf9c214c5293821999807b',
//         maxSeat: 3
//     }, {
//         id: '398a2122e8c5617119a90190',
//         maxSeat: 3
//     }
// ];

export interface EnergySource {
    id: string;
    maxSeat: number;
    type: 'source' | 'container'
}

export const room = Object.values(Game.rooms)[0];

export const sourceMap: EnergySource[] = Object.values(Game.rooms)[0].find(FIND_SOURCES).map(source => {
    return {
        id: source.id,
        maxSeat: 3,
        type: 'source'
    }
});


class sourceTable {

    harvesterMap = {};

    containerMap: EnergySource[] = [];

    sourceCheck() {
        const containers = room.find(FIND_STRUCTURES).filter(stru => stru.structureType === STRUCTURE_CONTAINER) as unknown as StructureContainer[];
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
        sourceMap.concat(this.containerMap).forEach(sMap => {
            const creepList = (this[sMap.id] || []) as string[];
            if (creepList.length) {
                this[sMap.id] = creepList.filter(creep => Game.creeps[creep]?.id);
                console.log(sMap.id, this[sMap.id]);
            }
        })
    }

    findSourceAble(creep: Creep): Source {

        // let energySource: EnergySource[];

        // if (creep.memory.action === TaskAction.harvest) {

        // }

        const sources = creep.room.find(FIND_SOURCES);
        const high = sourceMap.find(file => {
            if (!this[file.id]) {
                this[file.id] = [];
            }
            return this[file.id].includes(creep.name) && sources.find(s => s.id === file.id).energy > 0;
        });
        if (high) {
            return sources.find(s => s.id === high.id);
        }

        const middle = sourceMap.find(sourceFile => {
            const id = sourceFile.id;
            const sIn = sources.find(s => s.id === id);

            const seat = (this[id]?.length || 0) < sourceFile.maxSeat;
            if (seat) {
                return sIn.energy > 0;
            }
        });

        if (middle) {
            return sources.find(s => s.id === middle.id);
        }

        return sources[0];
    }

    findSourceWithCreepType(creep: Creep): Source {

        if (creep.memory.action === TaskAction.harvest) {
            return this.findSourceAble(creep);
        }

        const containers = room.find(FIND_STRUCTURES).filter(stru => stru.structureType === STRUCTURE_CONTAINER) as unknown as StructureContainer[];
        if (containers.length) {
            containers.find(con => {

            })
        }
    }
}

const table = new sourceTable();
export default table;

