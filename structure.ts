import { room } from "./room";


class StructureGlobal {
    structuresList: Structure[];

    cacheList: {
        [T in StructureConstant]?: Array<ConcreteStructure<T>>;
    } = {};

    updateStructuresList() {
        this.structuresList = room.instance.find(FIND_STRUCTURES);
        this.cacheList = {};
    }

    findStructureById(id: string) {
        return this.structuresList.find(stru => stru.id === id);
    }

    findStructureByType<T extends StructureConstant>(structureType: T) {
        if (this.cacheList[structureType]) {
            return this.cacheList[structureType];
        }
        const list = this.structuresList.filter(stru => stru.structureType === structureType) as Array<ConcreteStructure<T>>;
        if (!this.cacheList[structureType]) {
            // @ts-ignore
            this.cacheList[structureType] = list;
        }
        return list;
    }

}

export const structureGlobal = new StructureGlobal();
