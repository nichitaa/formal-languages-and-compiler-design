import {S0} from '../consts/consts';
import {isTerminal} from './index';

// if some state derives another non terminal return true
// e.g A -> S
const hasOneStateTransition = (grammar): boolean => {
    for (let s in grammar) {
        const arr = grammar[s];
        for (let state of arr) {
            const splited = state.split('');
            if (splited.length === 1 && !isTerminal(splited[0]) && s !== S0) {
                return true;
            }
        }

    }
    return false;
};

export default hasOneStateTransition;