import {CFG, EPSILON} from './consts';

export const cfg: CFG = {
    'S': ['aB', 'bA', 'B'],
    'A': ['b', 'aD', 'AS', 'bAB', EPSILON],
    'B': ['a', 'bS'],
    'C': ['AB'],
    'D': ['BB'],
};