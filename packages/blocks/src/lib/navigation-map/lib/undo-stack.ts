import type { Obstacle } from '../types';

const undoStack: Obstacle[][] = [];

export const addToUndoStack = (entry: Obstacle[]) => {
  undoStack.push(entry)
};

export const popOffUndoStack = () => {
  return undoStack.pop()
};
