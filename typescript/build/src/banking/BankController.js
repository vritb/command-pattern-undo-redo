"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankController = void 0;
var BankController = /** @class */ (function () {
    function BankController() {
        this.undo_stack = [];
        this.redo_stack = [];
    }
    ;
    BankController.prototype.execute = function (transaction) {
        transaction.execute();
        this.redo_stack.length = 0;
        this.undo_stack.push(transaction);
    };
    BankController.prototype.undo = function () {
        if (!this.undo_stack)
            return;
        var transaction = this.undo_stack.pop();
        if (transaction) {
            transaction.undo();
            this.redo_stack.push(transaction);
        }
    };
    BankController.prototype.redo = function () {
        if (!this.redo_stack)
            return;
        var transaction = this.redo_stack.pop();
        if (transaction) {
            transaction.execute();
            this.undo_stack.push(transaction);
        }
    };
    return BankController;
}());
exports.BankController = BankController;
//# sourceMappingURL=BankController.js.map