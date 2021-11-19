"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = void 0;
var Account_1 = require("./Account");
var uuid_1 = require("uuid");
var Bank = /** @class */ (function () {
    function Bank() {
        this.accounts = new Map();
    }
    Bank.prototype.createAccount = function (name) {
        var accountId = (0, uuid_1.v4)();
        var account = new Account_1.Account(name, accountId);
        this.accounts.set(accountId, account);
        return account;
    };
    Bank.prototype.getAccount = function (accountId) {
        return this.accounts.get(accountId);
    };
    return Bank;
}());
exports.Bank = Bank;
//# sourceMappingURL=Bank.js.map