package com.javadude.command.shared.undo;

import java.util.Stack;

import com.javadude.command.shared.command.Command;

public class UndoManager {

	private Stack<Command> undoStack = new Stack<Command>();
	private Stack<Command> redoStack = new Stack<Command>();
	
	private final UndoStateHandler handler;
	private final boolean mustNotify;

	public UndoManager() {
		this.handler = null;
		this.mustNotify= false;
	}

	public UndoManager(UndoStateHandler undoStateHandler) {
		mustNotify = undoStateHandler != null; 
		this.handler = undoStateHandler;
	}

	public void execute(Command command) {
		try {
			UndoManagerState oldState = new UndoManagerState(getUndoName(), getRedoName(), canUndo(), canRedo());
			command.execute();
			if (canUndo() && undoStack.peek().isCollapsible(command)) {
				undoStack.peek().collapse(command);
			} else {
				undoStack.push(command);
			}
			redoStack.clear();
			if (mustNotify)
				handler.processUndoStateChange(oldState, collectCurrentState());
		} catch (IllegalStateException e) {
			// report and log
		}
	}

	public void undo() {
		if (!undoStack.isEmpty()) {
			try {
				UndoManagerState oldState = collectCurrentState();
				Command command = undoStack.pop();
				command.undo();
				redoStack.push(command);
				if (mustNotify)
					handler.processUndoStateChange(oldState, collectCurrentState());
			} catch (IllegalStateException e) {
				// report and log
			}
		}
	}
	
	public void redo() {
		if (!redoStack.isEmpty()) {
			try {
				UndoManagerState oldState = collectCurrentState();
				Command command = redoStack.pop();
				command.redo();
				undoStack.push(command);
				if (mustNotify)
					handler.processUndoStateChange(oldState, collectCurrentState());
			} catch (IllegalStateException e) {
				// report and log
			}
		}
	}

	public Command[] getUndoables(){
		return undoStack.toArray(new Command[undoStack.size()]);
	}

	public Command[] getRedoables(){
		return redoStack.toArray(new Command[undoStack.size()]);
	}

	private UndoManagerState collectCurrentState() {
		UndoManagerState state = new UndoManagerState(getUndoName(), getRedoName(), canUndo(), canRedo());
		return state;
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
