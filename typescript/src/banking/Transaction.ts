import { Transactional } from '../util/Transactional';

export class Transaction implements Transactional {
    constructor() {
    }

    execute() : void {}
    undo() : void {}
    redo()  : void {}
}
