export class SackException {
    constructor(msg){
        this.msg = msg;
    }

    toString(){
        return "Sack Exception: "+this.msg;
    }
}

export default class Sack {

    /**
     * Construct a new sack
     * @param {array} master array that dictates all the items in the sack
     */
    constructor(master){
        this.set(master);
    }

    /**
     * Empty the sack out
     */
    clear(){
        this.master = [];
        this.unpickedKeys = new Set([]);
    }

    /**
     * Re-initialise a sack
     * @param {array} master array that dictates the new items to be in the sack
     */
    set(master){
        this.master = master;
        this.reshuffle();
    }

    /**
     * Add any picked elements back into the sack and reset
     */
    reshuffle(){
        this.unpickedKeys = new Set([...this.master.keys()]);
    }

    /**
     * How many items are in the sack
     * @param {boolean} onlyUnpicked Wether to only count the unpicked items
     */
    size(onlyUnpicked){
        return onlyUnpicked ? this.unpickedKeys.size : this.master.length;
    }

    /**
     * Select a key that hasn't been picked yet
     */
    _selectUnpickedKey(){
        const values = Array.from(this.unpickedKeys);
        let randomIndex = Math.floor(Math.random() * this.unpickedKeys.size);
        return values[randomIndex];
    }

    /**
     * Select a key, or multiple (unique) keys that have not already been picked
     * @param {number} count of keys to pick
     */
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

    /**
     * Pick several elements out of the sack
     * @param {number} count to pick
     */
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

    /**
     * Pick one or several elements out of the sack
     * @param {number} count to pick
     */
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

    /**
     * Peek at one or several as yet unpicked elements in the sack, but don't pick them out
     * @param {number} count to peek
     */
    peekRemaining(count){
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

    /**
     * Peek at one or several elements from all possible values, regardless of if they've been picked.
     * Won't remove them from the sack.
     * @param {number} count to peek
     */
    peekAll(count){
        if(count > this.master.length){
            throw new SackException("Not enough items in sack");
        }
        if(count===this.master.length){
            return this.master;
        }
        if(count >= 0){
            const picked = [];
            let values = this.master;
            for(let i = 0; i < count; i++){
                const randomIndex = Math.floor(Math.random() * values.length);
                picked.push(values[randomIndex]);
                const valueSet = new Set(values);
                valueSet.delete(values[randomIndex]);
                values = Array.from(valueSet);
            }
            return picked;
        } else {
            const randomIndex = Math.floor(Math.random() * this.master.length);
            return this.master[randomIndex];
        }
    }
}
