
import { Account } from "./Account";
import { v4 as uuid } from 'uuid';


export class Bank {
    accounts= new Map<string, Account>();

    createAccount(name: string) : Account {
        const accountId = uuid();  
        const account = new Account(name, accountId);
        this.accounts.set(accountId, account);
        return account;
    }

    getAccount(accountId: string) : Account | undefined {
        return this.accounts.get(accountId);
    }
}