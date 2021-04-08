import {CFG, EPSILON} from './consts';

export const cfg: CFG = {
    'S': ['abAB'],
    'A': ['aSab', 'BS', 'aA', 'b'],
    'B': ['BA', 'ababB', 'b', EPSILON],
    'C': ['AS'],
};