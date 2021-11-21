package com.javadude.command;

import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.util.Stack;

import com.javadude.command.shared.Command;

public class UndoManager {
	private PropertyChangeSupport pcs = new PropertyChangeSupport(this);
	
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

	private Stack<Command> undoStack = new Stack<Command>();
	private Stack<Command> redoStack = new Stack<Command>();
	
	private class State {
		private String undoName;
		private String redoName;
		private boolean canUndo;
		private boolean canRedo;

		public State(String undoName, String redoName, boolean canUndo, boolean canRedo){
			this.undoName = undoName;
			this.redoName = redoName;
			this.canUndo = canUndo;
			this.canRedo = canRedo;
		}
	}

	public void execute(Command command) {
		try {
			State previousState = new State(getUndoName(), getRedoName(), canUndo(), canRedo());
			command.execute();
			if (canUndo() && undoStack.peek().isCollapsible(command)) {
				undoStack.peek().collapse(command);
			} else {
				undoStack.push(command);
			}
			redoStack.clear();
			fireChanges(previousState);
		} catch (IllegalStateException e) {
			// report and log
		}
	}

	public void undo() {
		if (!undoStack.isEmpty()) {
			try {
				State previousState = new State(getUndoName(), getRedoName(), canUndo(), canRedo());
				Command command = undoStack.pop();
				command.undo();
				redoStack.push(command);
				fireChanges(previousState);
			} catch (IllegalStateException e) {
				// report and log
			}
		}
	}
	
	public void redo() {
		if (!redoStack.isEmpty()) {
			try {
				State previousState = new State(getUndoName(), getRedoName(), canUndo(), canRedo());
				Command command = redoStack.pop();
				command.redo();
				undoStack.push(command);
				fireChanges(previousState);
			} catch (IllegalStateException e) {
				// report and log
			}
		}
	}
	
	private void fireChanges(State oldState) {
		pcs.firePropertyChange("undoName", oldState.undoName, getUndoName());
		pcs.firePropertyChange("redoName", oldState.redoName, getRedoName());
		pcs.firePropertyChange("canUndo", oldState.canUndo, canUndo());
		pcs.firePropertyChange("canRedo", oldState.canRedo, canRedo());
	}

	public boolean canUndo() {
		return !undoStack.isEmpty();
	}

	public boolean canRedo() {
		return !redoStack.isEmpty();
	}
	
	public String getUndoName() {
		if (canUndo()) {
			return undoStack.peek().getName();
		}
		return "Nothing to undo!";
	}

	public String getRedoName() {
		if (canRedo()) {
			return redoStack.peek().getName();
		}
		return "Nothing to redo!";
	}
}
