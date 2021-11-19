import { Undoable } from './Undoable';

export interface Transactional extends Undoable {
    execute() : void;
}
