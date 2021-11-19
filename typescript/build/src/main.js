"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bank_1 = require("./banking/Bank");
var Commands_1 = require("./banking/Commands");
var BankController_1 = require("./banking/BankController");
function main() {
    // create a bank
    var bank = new Bank_1.Bank();
    try {
        // create a bank controller
        var controller = new BankController_1.BankController();
        // create some accounts
        var account1 = bank.createAccount("ArjanCodes");
        var account2 = bank.createAccount("Google");
        var account3 = bank.createAccount("Microsoft");
        // deposit some money in my account
        controller.execute(new Commands_1.Deposit(account1, 100000));
        controller.undo();
        controller.redo();
        // execute a batch of commands
        controller.execute(new Commands_1.Batch([
            new Commands_1.Deposit(account2, 100000),
            new Commands_1.Deposit(account3, 100000),
            //Withdrawal(account1, 100000000),
            new Commands_1.Transfer(account2, account1, 50000),
        ]));
        // undo and redo
        controller.undo();
        controller.undo();
        controller.redo();
        controller.redo();
        // get the money out of my account
        controller.execute(new Commands_1.Withdrawal(account1, 150000));
    }
    catch (e) {
        console.log(e);
    }
    finally {
        console.log(bank);
    }
}
main();
//# sourceMappingURL=main.js.map