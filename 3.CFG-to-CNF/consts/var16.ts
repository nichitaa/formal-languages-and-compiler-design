import {CFG, S, EPSILON} from './consts';

export const cfg: CFG = {
    [S]: ['abAB'],
    'A': [`a${S}ab`, `B${S}`, 'aA', 'b'],
    'B': ['BA', 'ababB', 'b', EPSILON],
    'C': [`A${S}`],
};