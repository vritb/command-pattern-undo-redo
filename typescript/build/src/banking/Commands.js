"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batch = exports.Transfer = exports.Withdrawal = exports.Deposit = void 0;
var Deposit = /** @class */ (function () {
    function Deposit(account, amount) {
        this.account = account;
        this.amount = amount;
    }
    Deposit.prototype.transferDetails = function () {
        return "" + this.amount + " to account " + this.account.name;
    };
    Deposit.prototype.execute = function () {
        this.account.deposit(this.amount);
        console.log("Deposited " + this.transferDetails());
    };
    Deposit.prototype.undo = function () {
        this.account.withdraw(this.amount);
        console.log("Undid deposit of " + this.transferDetails());
    };
    Deposit.prototype.redo = function () {
        this.account.deposit(this.amount);
        console.log("Redid deposit of " + this.transferDetails());
    };
    return Deposit;
}());
exports.Deposit = Deposit;
var Withdrawal = /** @class */ (function () {
    function Withdrawal(account, amount) {
        this.account = account;
        this.amount = amount;
    }
    Withdrawal.prototype.transferDetails = function () {
        return "" + this.amount + " from account " + this.account.name;
    };
    Withdrawal.prototype.execute = function () {
        this.account.withdraw(this.amount);
        console.log("Withdrawn " + this.transferDetails());
    };
    Withdrawal.prototype.undo = function () {
        this.account.deposit(this.amount);
        console.log("Undid withdrawal of " + this.transferDetails());
    };
    Withdrawal.prototype.redo = function () {
        this.account.withdraw(this.amount);
        console.log("Redid withdrawal of " + this.transferDetails());
    };
    return Withdrawal;
}());
exports.Withdrawal = Withdrawal;
var Transfer = /** @class */ (function () {
    function Transfer(fromAccount, toAccount, amount) {
        this.toAccount = toAccount;
        this.fromAccount = fromAccount;
        this.amount = amount;
    }
    Transfer.prototype.transferDetails = function () {
        return ("" +
            this.amount +
            " from account " +
            this.fromAccount.name +
            "to account " +
            this.toAccount.name);
    };
    Transfer.prototype.execute = function () {
        this.fromAccount.withdraw(this.amount);
        this.toAccount.deposit(this.amount);
        console.log("Transferred " + this.transferDetails());
    };
    Transfer.prototype.undo = function () {
        this.toAccount.withdraw(this.amount);
        this.fromAccount.deposit(this.amount);
        console.log("Undid transfer of " + this.transferDetails());
    };
    Transfer.prototype.redo = function () {
        this.fromAccount.withdraw(this.amount);
        this.toAccount.deposit(this.amount);
        console.log("Redid transfer of " + this.transferDetails());
    };
    return Transfer;
}());
exports.Transfer = Transfer;
var Batch = /** @class */ (function () {
    function Batch(commands) {
        this.commands = [];
        this.commands = commands;
    }
    Batch.prototype.execute = function () {
        var completedCommands = [];
        try {
            this.commands.forEach(function (command) {
                command.execute();
                completedCommands.push(command);
            });
        }
        catch (e) {
            completedCommands.reverse().forEach(function (command) {
                command.undo();
            });
            throw new Error("Undo should have happened! Cause was: {" + e + "}");
        }
    };
    Batch.prototype.undo = function () {
        this.commands.reverse().forEach(function (command) {
            command.undo();
        });
    };
    Batch.prototype.redo = function () {
        this.commands.forEach(function (command) {
            command.redo();
        });
    };
    return Batch;
}());
exports.Batch = Batch;
//# sourceMappingURL=Commands.js.map