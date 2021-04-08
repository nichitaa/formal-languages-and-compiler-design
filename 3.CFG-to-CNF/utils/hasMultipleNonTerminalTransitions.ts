import {CFG, S0} from '../consts/consts';

const hasMultipleNonTerminalTransitions = (grammar: CFG): boolean => {
    for (let s in grammar) {
        const arr = grammar[s];
        for (let state of arr) {
            let splitedState = state.split('');
            if (splitedState.length > 2 && s !== S0) return true;
        }
    }
    return false;
};

export default hasMultipleNonTerminalTransitions;