// rule: if is not included in RHA of fa excluding itself
// e.g: E -> XA | E ( if E can not be reached from elsewhere in fa, its useless )
import {CFG} from '../consts/consts';
import {structuredClone} from './index';

const isUseless = (grammar: CFG, stateToCheck: string): boolean => {
    const cfg = structuredClone(grammar);
    for (let s in cfg) {
        const arr = cfg[s];
        for (let state of arr) {
            if (s !== stateToCheck) {
                let splited = state.split('');
                if (splited.includes(stateToCheck)) {
                    return false;
                }
            }
        }
    }
    return true;
};

export default isUseless;

