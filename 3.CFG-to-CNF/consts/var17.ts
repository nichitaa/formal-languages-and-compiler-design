import {CFG, EPSILON} from './consts';

// export const cfg: CFG = {
//     'S': ['aA', 'AC'],
//     'A': ['a', 'ASC', 'BC', 'aD', 'C'],
//     'B': ['b', 'bA'],
//     'C': [EPSILON, 'BA'],
//     'E': ['aB'],
//     'D': ['abC'],
// };

export const cfg: CFG = {
    'S': ['aA', 'AC'],
    'A': ['a', 'ASC', 'BC', 'aD'],
    'B': ['b', 'bA'],
    'C': [EPSILON, 'BA'],
    'E': ['aB'],
    'D': ['abC'],
};