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


