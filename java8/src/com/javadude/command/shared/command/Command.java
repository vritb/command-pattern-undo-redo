package com.javadude.command.shared.command;

public interface Command {
	void execute();
	void undo();
	void redo();
	boolean isCollapsible(Command command);
	void collapse(Command command);
	String getName();
}
