/**
 * What a click, Enter, or Space on a branch row does. `'toggle'` opens or closes the branch and
 * never selects it, for a tree whose branches are folders rather than choices. `'select'` selects
 * the branch and leaves it to the trigger to open. `'toggle-and-select'` does both.
 */
export type TreeBranchClick = 'toggle' | 'select' | 'toggle-and-select';
