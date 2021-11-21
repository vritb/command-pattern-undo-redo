package com.javadude.command.presentation.actions;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import com.javadude.command.commands.WithdrawCommand;
import com.javadude.command.domain.Account;
import com.javadude.command.UndoManager;

public class WithdrawAction implements ActionListener {
	private Account account;
	private int amount;
	private UndoManager undoManager;
	
	public WithdrawAction(UndoManager undoManager, Account account, int amount) {
		this.undoManager = undoManager;
		this.account = account;
		this.amount = amount;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		undoManager.execute(new WithdrawCommand(account, amount));
	}
}
