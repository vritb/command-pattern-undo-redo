import {Transaction}  from './Transaction';

export class BankController {
    undo_stack: Transaction[] = [];
    redo_stack: Transaction[] = [];

    constructor(){};

    execute(transaction: Transaction) : void {
        transaction.execute();
        this.redo_stack.length = 0;
        this.undo_stack.push(transaction)
    }

    undo() : void {
        if (!this.undo_stack)
            return
        const transaction = this.undo_stack.pop()
        if (transaction) {
        transaction.undo();
        this.redo_stack.push(transaction);
        }
    }

    redo() : void {
        if (!this.redo_stack)
            return
        let transaction = this.redo_stack.pop()
        if (transaction) {
            transaction.execute();
            this.undo_stack.push(transaction);
        }
    }
}