package com.javadude.command.shared;

public interface Command {
	void execute();
	void undo();
	void redo();
	boolean isCollapsible(Command command);
	void collapse(Command command);
	String getName();
}
