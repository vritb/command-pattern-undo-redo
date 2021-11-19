import { InsufficientFunds} from './AccountExceptions';

export class Account {
    balance: number = 0;
    name: string;
    accountId: string;

    constructor(name : string, accountId : string){
        this.balance = 0;
        this.name = name;
        this.accountId = accountId;
    }

    deposit(amount: number) : void {
        this.balance += amount;
    }

    withdraw(amount: number) : void {
        if (amount > this.balance)
            throw new InsufficientFunds(amount, this.balance, this.accountId);
        this.balance -= amount;
    }
}