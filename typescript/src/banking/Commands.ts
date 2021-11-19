import { Account } from "./Account";
import { InsufficientFunds } from "./AccountExceptions";
import { Transaction } from "./Transaction";
import { Command } from "../util/Command";

export class Deposit implements Command {
  account: Account;
  amount: number;

  constructor(account: Account, amount: number) {
    this.account = account;
    this.amount = amount;
  }

  transferDetails(): string {
    return "" + this.amount + " to account " + this.account.name;
  }

  execute(): void {
    this.account.deposit(this.amount);
    console.log("Deposited " + this.transferDetails());
  }

  undo(): void {
    this.account.withdraw(this.amount);
    console.log("Undid deposit of " + this.transferDetails());
  }

  redo(): void {
    this.account.deposit(this.amount);
    console.log("Redid deposit of " + this.transferDetails());
  }
}

export class Withdrawal {
  account: Account;
  amount: number;

  constructor(account: Account, amount: number) {
    this.account = account;
    this.amount = amount;
  }

  transferDetails(): string {
    return "" + this.amount + " from account " + this.account.name;
  }

  execute(): void {
    this.account.withdraw(this.amount);
    console.log("Withdrawn " + this.transferDetails());
  }

  undo(): void {
    this.account.deposit(this.amount);
    console.log("Undid withdrawal of " + this.transferDetails());
  }

  redo(): void {
    this.account.withdraw(this.amount);
    console.log("Redid withdrawal of " + this.transferDetails());
  }
}

export class Transfer {
  fromAccount: Account;
  toAccount: Account;
  amount: number;

  constructor(fromAccount: Account, toAccount: Account, amount: number) {
    this.toAccount = toAccount;
    this.fromAccount = fromAccount;
    this.amount = amount;
  }

  transferDetails(): string {
    return (
      "" +
      this.amount +
      " from account " +
      this.fromAccount.name +
      "to account " +
      this.toAccount.name
    );
  }

  execute(): void {
    this.fromAccount.withdraw(this.amount);
    this.toAccount.deposit(this.amount);
    console.log("Transferred " + this.transferDetails());
  }

  undo(): void {
    this.toAccount.withdraw(this.amount);
    this.fromAccount.deposit(this.amount);
    console.log("Undid transfer of " + this.transferDetails());
  }

  redo(): void {
    this.fromAccount.withdraw(this.amount);
    this.toAccount.deposit(this.amount);
    console.log("Redid transfer of " + this.transferDetails());
  }
}

export class Batch {
  commands: Transaction[] = [];

  constructor(commands: Transaction[]) {
    this.commands = commands;
  }

  execute(): void {
    let completedCommands: Transaction[] = [];
    try {
      this.commands.forEach((command) => {
        command.execute();
        completedCommands.push(command);
      });
    } catch (e) {
      completedCommands.reverse().forEach((command) => {
        command.undo();
      });
      throw new Error("Undo should have happened! Cause was: {" + e + "}");
    }
  }

  undo(): void {
    this.commands.reverse().forEach((command) => {
      command.undo();
    });
  }

  redo(): void {
    this.commands.forEach((command) => {
      command.redo();
    });
  }
}
