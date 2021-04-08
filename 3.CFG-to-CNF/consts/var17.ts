import {CFG, EPSILON, S} from './consts';

// export const cfg: CFG = {
//     'S': ['aA', 'AC'],
//     'A': ['a', 'ASC', 'BC', 'aD', 'C'],
//     'B': ['b', 'bA'],
//     'C': [EPSILON, 'BA'],
//     'E': ['aB'],
//     'D': ['abC'],
// };

// S is start symbol, can configure its value in consts/consts.ts
export const cfg: CFG = {
    [S]: ['aA', 'AC'],
    'A': ['a', `A${S}C`, 'BC', 'aD'],
    'B': ['b', 'bA'],
    'C': [EPSILON, 'BA'],
    'E': ['aB'],
    'D': ['abC'],
};