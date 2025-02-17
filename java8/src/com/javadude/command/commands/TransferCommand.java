package com.javadude.command.commands;

import com.javadude.command.domain.Account;
import com.javadude.command.shared.command.Command;

public class TransferCommand implements Command {
	private Account from;
	private Account to;
	private int amount;

	public TransferCommand(Account from, Account to, int amount) {
		this.from = from;
		this.to = to;
		this.amount = amount;
	}

	@Override
	public void execute() {
		try {
			// start transaction
			from.withdraw(amount);
			to.deposit(amount);
		} finally {
			// end transaction
		}
	}

	@Override
	public void undo() {
		try {
			// start transaction
			to.withdraw(amount);
			from.deposit(amount);
		} finally {
			// end transaction
		}
	}

	@Override
	public void redo() {
		execute();
	}

	@Override
	public String getName() {
		return "Transfer " + amount + " from account " + from.getId() + " to account " + to.getId();
	}

	@Override
	public boolean isCollapsible(Command command) {
		return false;
	}

	@Override
	public void collapse(Command command) {
	}
}
