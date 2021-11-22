package com.javadude.command.shared.undo;

public class UndoManagerState {

    public final String undoName;
    public final String redoName;
    public final boolean canUndo;
    public final boolean canRedo;

    public UndoManagerState(String undoName, String redoName, boolean canUndo, boolean canRedo){
        this.undoName = undoName;
        this.redoName = redoName;
        this.canUndo = canUndo;
        this.canRedo = canRedo;
    }
}
