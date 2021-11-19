class AccountException extends Error {
    constructor(msg : string){
        super(msg);
    } 
}

export class InsufficientFunds extends AccountException {
    constructor(amount : number, balance : number, accountId: string){
        super("Insufficient Funds! Cannot withdraw "+ amount + ". Balance: " + balance+ " in account "+accountId+".");
    }
}

