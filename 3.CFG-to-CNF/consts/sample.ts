import {CFG, EPSILON, S} from './consts';

export const cfg: CFG = {
    [S]: ['AC', 'bA', 'B', 'aA'],
    'A': [EPSILON, `a${S}`, 'ABAb'],
    'B': ['a', `Ab${S}A`],
    'C': ['abC'],
    'D': ['AB'],
};