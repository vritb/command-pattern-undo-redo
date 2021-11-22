package com.javadude.command.presentation;

import java.awt.BorderLayout;
import java.awt.GridLayout;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JLabel;
import javax.swing.WindowConstants;

import com.javadude.command.domain.Account;
import com.javadude.command.presentation.actions.*;
import com.javadude.command.shared.command.Command;
import com.javadude.command.shared.undo.UndoManager;
import com.javadude.command.shared.undo.UndoManagerState;
import com.javadude.command.shared.undo.UndoStateHandler;

@SuppressWarnings("serial")
public class BankUI extends JFrame implements UndoStateHandler {
	private Account account1 = new Account(1);
	private Account account2 = new Account(2);
	private UndoManager undoManager = new UndoManager(this);
	private AppButton undoButton = new AppButton("Undo", e -> {undoManager.undo();});
	private AppButton redoButton = new AppButton("Redo", e -> {undoManager.redo();});
	private PropertyChangeSupport pcs = new PropertyChangeSupport(this);
	 
	
	public BankUI() {
		super("Banking Application");
		setLayout(new BorderLayout());
		add(BorderLayout.NORTH, new JPanel(new GridLayout(1, 0, 5, 5)) {{
			add(new AccountUI(account1));
			add(new AccountUI(account2));
		}});
		add(BorderLayout.SOUTH, new JPanel(new GridLayout(0, 1, 5, 5)) {{
			add(new AppButton("Deposit $10 to account 1", new DepositAction(undoManager, account1, 10)));
			add(new AppButton("Deposit $10 to account 2", new DepositAction(undoManager, account2, 10)));
			add(new AppButton("Withdraw $10 from account 1", new WithdrawAction(undoManager, account1, 10)));
			add(new AppButton("Withdraw $10 from account 2", new WithdrawAction(undoManager, account2, 10)));
			add(new AppButton("Transfer $10 from account 1 to account 2", new TransferAction(undoManager, account1, account2, 10)));
			add(new AppButton("Transfer $10 from account 2 to account 1", new TransferAction(undoManager, account2, account1, 10)));
			add(new JLabel("Undo/Redo", JLabel.CENTER));
			add(undoButton);
			add(redoButton);
		}});
		this.addPropertyChangeListener(e -> updateButtons());
		updateButtons();
		setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
		pack();
	}

	private void updateButtons() {
		undoButton.setVisible(undoManager.canUndo());
		undoButton.setText("Undo " + undoManager.getUndoName());
		redoButton.setVisible(undoManager.canRedo());
		redoButton.setText("Redo " + undoManager.getRedoName());
	}
	
	private static class AppButton extends JButton {
		public AppButton(String text, ActionListener actionListener) {
			super(text);
			addActionListener(actionListener);
		}
	}

	public void addPropertyChangeListener(PropertyChangeListener listener) {
		pcs.addPropertyChangeListener(listener);
	}

	public void addPropertyChangeListener(String propertyName, PropertyChangeListener listener) {
		pcs.addPropertyChangeListener(propertyName, listener);
	}

	public void removePropertyChangeListener(PropertyChangeListener listener) {
		pcs.removePropertyChangeListener(listener);
	}

	public void removePropertyChangeListener(String propertyName, PropertyChangeListener listener) {
		pcs.removePropertyChangeListener(propertyName, listener);
	}

	public void processUndoStateChange(UndoManagerState oldState, UndoManagerState newState) {
		pcs.firePropertyChange("undoName", oldState.undoName, newState.undoName);
		pcs.firePropertyChange("redoName", oldState.redoName, newState.redoName);
		pcs.firePropertyChange("canUndo", oldState.canUndo, newState.canUndo);
		pcs.firePropertyChange("canRedo", oldState.canRedo, newState.canRedo);
	}
}
