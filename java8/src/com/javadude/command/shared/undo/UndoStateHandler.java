package com.javadude.command.shared.undo;

public interface UndoStateHandler {
    public void processUndoStateChange(UndoManagerState oldState, UndoManagerState newState);
}