"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
var AccountExceptions_1 = require("./AccountExceptions");
var Account = /** @class */ (function () {
    function Account(name, accountId) {
        this.balance = 0;
        this.balance = 0;
        this.name = name;
        this.accountId = accountId;
    }
    Account.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    Account.prototype.withdraw = function (amount) {
        if (amount > this.balance)
            throw new AccountExceptions_1.InsufficientFunds(amount, this.balance, this.accountId);
        this.balance -= amount;
    };
    return Account;
}());
exports.Account = Account;
//# sourceMappingURL=Account.js.map