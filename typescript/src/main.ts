import { Bank } from "./banking/Bank";
import { Batch, Deposit, Transfer, Withdrawal } from "./banking/Commands";
import { BankController } from "./banking/BankController";

function main(): void {
  // create a bank
  let bank = new Bank();
  try {

  // create a bank controller
  let controller = new BankController();

  // create some accounts
  let account1 = bank.createAccount("ArjanCodes");
  let account2 = bank.createAccount("Google");
  let account3 = bank.createAccount("Microsoft");

  // deposit some money in my account
  controller.execute(new Deposit(account1, 100000));
  controller.undo();
  controller.redo();

  // execute a batch of commands
  controller.execute(
    new Batch([
      new Deposit(account2, 100000),
      new Deposit(account3, 100000),
      //Withdrawal(account1, 100000000),
      new Transfer(account2, account1, 50000),
    ])
  );

  // undo and redo
  controller.undo();
  controller.undo();
  controller.redo();
  controller.redo();

  // get the money out of my account
  controller.execute(new Withdrawal(account1, 150000));
  } catch (e) {
      console.log(e);
  } finally {
      console.log(bank);
  }
}

main();
