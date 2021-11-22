# Design Patterns Command Undo Redo

Was derived from work of <a href="http://javadude.com">*javadude*</a>.
You find the original projet at https://github.com/javadude/patterns.session4.git).

## Modifications

### Restructuring Existing Project Classes
    
The existing classes have been collected in hierarchical groups of same concern.

* Application (app)

* Presentation
    * User-Interface (UI)
    * Actions

* Domain

* Commands

* Shared

### Refactoring UndoManager

Separate application specific code (_PropertyChangeSupport_ and _fireChanges()_) from <code>UndoManager</code>.

Introduce an <code>UndoManagerState</code> class to model a state of the *UndoManager* explicitely. Use two instances of _UndoManagerState_ to notify the invoker about possible changes (_old_-state and _new_-state) after a command was executed) in the state of the <code>UndoManager</code>. 

Therefore a _handler_ has to be provided to the _UndoManager_. The handler can be used to react on the command executions outcome by the application.
The _handler_ (interface <code>UndoStateHandler</code>) has one method <code>processStateChange(oldState, newState)</code>. 
The handler must be provided by application to react on changes in the _UndoManager_.



### Removals

* `SampleAction.java`
    was used to demonstrate how <code>ActionListeners/PropertyChangeListeners</code> work.

### Renamings

* `Sample.java` to `Application.java`<br/>
    Makes usage more evident.
* `isUndoAvailable()` to `canUndo()`<br/>
    Shorter name
* `isRedoAvailable()` to `canRedo()`<br/>
    Shorter name
* `OldState` to `State`<br/>
    Makes usage more evident
* `MyButton` to `AppButton`<br/>
    Make usage more evient


### Ideas

## Show all command in Undo / Redo stack

* _BankUI_ should update UI via UndoStteHandler with the latest Undo/Redo stack contents


* Changes needed in <code>processUndoStateChanger()</code>.
* Need to dynamically add and remove Labels representing commands.

* UI similar to this:
```java
add(new JPanel(new BorderLayout()) {{
	add(BorderLayout.CENTER, new JPanel(new GridLayout(0, 2, 5, 5)) {{
		add(new JLabel("Undoables", JLabel.CENTER));
		add(new JLabel("Redoables", JLabel.CENTER));

        // First remove current list of labels for Undoables and Redoables. TO BE IMPLEMENTED

        // Then attach newly created ones
    	for (Command cmd : undoManager.getUndoables()) {
			add(new JLabel(cmd.getName()));
		}

		for (Command cmd : undoManager.getRedoables()){
			add(new JLabel(cmd.getName()));
		}

        // Then force update of UI
	}});
}});
```

