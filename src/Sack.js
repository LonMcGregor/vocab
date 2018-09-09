class SackException {
    constructor(msg){
        this.msg = msg;
    }

    toString(){
        return "Sack Exception: "+this.msg;
    }
}

export default class Sack {

    constructor(master){
        this.set(master);
    }

    clear(){
        this.master = [];
        this.unpickedKeys = new Set([]);
    }

    set(master){
        this.master = master;
        this.reshuffle();
    }

    reshuffle(){
        this.unpickedKeys = new Set([...this.master.keys()]);
    }

    size(onlyUnpicked){
        return onlyUnpicked ? this.unpickedKeys.size : this.master.length;
    }

    _selectUnpickedKey(){
        const values = Array.from(this.unpickedKeys);
        let randomIndex = Math.floor(Math.random() * this.unpickedKeys.size);
        return values[randomIndex];
    }

    _selectUniqueUnpickedKeys(count){
        if(count > this.unpickedKeys.size){
            throw new SackException("Not enough keys left in sack.");
        }
        if(count===this.unpickedKeys.size){
            return Array.from(this.unpickedKeys);
        }
        // a smart person would inver the logic here
        // instead removing items from an existing set
        // if the selection count is higher than half the size of the full set
        const picked = [];
        let values = Array.from(this.unpickedKeys);
        for(let i = 0; i < count; i++){
            const randomIndex = Math.floor(Math.random() * values.length);
            picked.push(values[randomIndex]);
            const valueSet = new Set(values);
            valueSet.delete(values[randomIndex]);
            values = Array.from(valueSet);
        }
        return picked;
    }

    _pickSeveral(count){
        if(count > this.unpickedKeys.size){
            throw new SackException("Not enough keys left in sack.");
        }
        if(count===this.unpickedKeys.size){
            const result = Array.from(this.unpickedKeys).map(x => this.master[x]);
            this.unpickedKeys.clear();
            return result;
        }
        const arr = [];
        for (let i = 0; i < count; i++) {
            const key = this._selectUnpickedKey();
            this.unpickedKeys.delete(key);
            arr.push(this.master[key]);
        }
        return arr;
    }

    pick(count){
        if(this.unpickedKeys.size === 0){
            throw new SackException("Sack Empty. Set new values or reshuffle");
        }
        if(count===undefined){
            const key = this._selectUnpickedKey();
            this.unpickedKeys.delete(key);
            return this.master[key];
        } else {
            return this._pickSeveral(count);
        }
    }

    peek(count){
        if(this.unpickedKeys.size === 0){
            throw new SackException("Sack Empty. Set new values or reshuffle.");
        }
        if(count===undefined){
            const key = this._selectUnpickedKey();
            return this.master[key];
        } else {
            const picked = this._selectUniqueUnpickedKeys(count);
            return picked.map(x => this.master[x]);
        }
    }
}
